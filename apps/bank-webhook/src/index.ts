import express, { Request, Response } from "express";
import db from "@repo/db/client";

const app = express();
app.use(express.json());


const processWebhook = async (req: Request, res: Response, webhookType: string) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        const existingTransaction = await db.onRampTransaction.findUnique({
            where: { token: paymentInformation.token }
        });

        if (existingTransaction && existingTransaction.status === "Success") {
            return res.status(409).json({
                message: "Payment has already been processed"
            });
        }

        await db.$transaction([
            db.balance.updateMany({
                where: { userId: Number(paymentInformation.userId) },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: { token: paymentInformation.token },
                data: { status: "Success" }
            })
        ]);

        res.json({ message: "Captured" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: `Error while processing ${webhookType} webhook` });
    }
};


app.post("/hdfcWebhook", async (req: Request, res: Response) => {
    await processWebhook(req, res, "HDFC");
});

app.post("/axisWebhook", async (req: Request, res: Response) => {
    await processWebhook(req, res, "Axis");
});

app.post("/pnbWebhook", async (req: Request, res: Response) => {
    await processWebhook(req, res, "PNB");
});

app.post("/kotakWebhook", async (req: Request, res: Response) => {
    await processWebhook(req, res, "Kotak");
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

