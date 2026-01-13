import { Document, Model } from "mongoose";
type SessionState = 'MAIN_MENU' | 'ITEM_SELECTION' | 'ITEM_ADDED' | 'CURRENT_ORDER' | 'ORDER_HISTORY' | 'CHECKOUT_ORDER' | 'MAKING_PAYMENT';
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