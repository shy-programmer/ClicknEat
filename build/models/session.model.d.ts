import { Document, Model } from "mongoose";
type SessionState = 'IDLE' | 'ITEM_SELECTION' | 'CURRENT_ORDER' | 'ORDER_HISTORY' | 'MAKING_PAYMENT';
export interface ISession extends Document {
    sessionId: string;
    state: SessionState;
    choiceMap: Record<string, string>;
    currentOrderId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Session: Model<ISession>;
export {};
//# sourceMappingURL=session.model.d.ts.map