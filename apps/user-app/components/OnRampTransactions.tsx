import { Card2 } from "@repo/ui/card2";
import {OnRampStatus} from "@repo/db/OnRampStatus";



export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus,
    
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card2 title="Received Transactions">
                <div className="text-center pb-8 pt-8">
                    No Received transactions
                </div>
            </Card2>
        );
    }
    return (
        <Card2 title="Received Transactions">
            <div className="pt-2">
                {transactions.map(t => (
                    <div className="flex justify-between" key={t.time.toString()}>
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                        <div className={`text-sm ${getStatusColorClass(t.status)}`}>
                            {getStatusDescription(t.status)}
                        </div>
                    </div>
                ))}
            </div>
        </Card2>
    );
};


const getStatusDescription = (status: OnRampStatus): string => {
    switch (status) {
        case OnRampStatus.Success:
            return "Transaction successful";
        case OnRampStatus.Pending:
            return "Transaction pending";
        case OnRampStatus.Failure:
            return "Transaction failed";
        default:
            return "";
    }
};


const getStatusColorClass = (status: OnRampStatus): string => {
    switch (status) {
        case OnRampStatus.Success:
            return "text-green-600";
        case OnRampStatus.Pending:
            return "text-blue-600";
        case OnRampStatus.Failure:
            return "text-red-600";
        default:
            return "";
    }
};
