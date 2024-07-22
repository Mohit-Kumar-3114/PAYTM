import express, { Request, Response } from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

const webhookSchema = z.object({
    token: z.string(),
    user_identifier: z.number().int(),
    amount: z.number().int()
});

const processWebhook = async (req: Request, res: Response, webhookType: string) => {
    const parseResult = webhookSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid payload", errors: parseResult.error.errors });
    }

    const paymentInformation = parseResult.data;

    try {
        const existingTransaction = await db.onRampTransaction.findUnique({
            where: { token: paymentInformation.token }
        });

        if (existingTransaction && existingTransaction.status === "Success") {
            return res.status(409).json({
                message: "Payment has already been processed"
            });
        }

        if (!existingTransaction || 
            existingTransaction.userId !== paymentInformation.user_identifier || 
            existingTransaction.amount !== paymentInformation.amount) {
            return res.status(400).json({
                message: "Invalid transaction details"
            });
        }

        await db.$transaction([
            db.balance.updateMany({
                where: { userId: paymentInformation.user_identifier },
                data: {
                    amount: {
                        increment: paymentInformation.amount
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
