import { Card2 } from "@repo/ui/card2";

export const SentTransactions=({
    transactions
}: {
    transactions: {
        amount: number,
        timestamp: Date,
        toUserId:number

    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card2 title="Sent Transactions">
                <div className="text-center pb-8 pt-8">
                    No sent transactions
                </div>
            </Card2>
        );
    }
    return (
        <Card2 title="Sent Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div className="flex justify-between" key={index}>
                        <div>
                            <div className="text-sm">
                                Sent to user ID: {t.toUserId}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toLocaleString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            - Rs {t.amount/100}
                        </div>
                        <div className={`text-sm text-green-600`}>
                            Success
                        </div>
                    </div>
                ))}
            </div>
        </Card2>
    );
};
