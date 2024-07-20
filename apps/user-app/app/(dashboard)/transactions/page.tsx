import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { SentTransactions } from "../../../components/p2ptransactions";
import { OnRampTransaction, p2pTransfer } from "@repo/db/money";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t: OnRampTransaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

async function p2p() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map((t: p2pTransfer) => ({
        timestamp: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId
    }));
}

export default async function TransactionsPage() {
    const transactions = await getOnRampTransactions();
    const transactions2 = await p2p();
    return (
        <div className="w-full">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="w-full flex justify-center">
                <div className="w-full pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
                <div className="pt-4 pl-4 pr-4 w-full">
                    <SentTransactions transactions={transactions2} />
                </div>
            </div>
        </div>
    );
}
