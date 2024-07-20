
import { OnRampStatus } from "./index2";
export type OnRampTransaction = {
    startTime: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
};

export type p2pTransfer = {
    timestamp: Date;
    amount: number;
    toUserId: number;
};
