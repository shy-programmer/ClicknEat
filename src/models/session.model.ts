import mongoose, {Document, Schema, Model} from "mongoose";

type SessionState = 'MAIN_MENU' | 'ITEM_SELECTION' | 'ITEM_ADDED' | 'CURRENT_ORDER' | 'ORDER_HISTORY' | 'CHECKOUT_ORDER' | 'MAKING_PAYMENT' | 'SCHEDULE_ORDER';

export interface ISession extends Document {
    sessionId: string;
    state: SessionState;
    choiceMap: Record<string, string>;
    currentOrderId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const sessionSchema: Schema<ISession> = new Schema(
    {
        sessionId: { type: String, required: true, unique: true },
        state: {type: String, required: true, enum: ['MAIN_MENU', 'ITEM_SELECTION', 'ITEM_ADDED', 'CURRENT_ORDER', 'ORDER_HISTORY', 'CHECKOUT_ORDER', 'MAKING_PAYMENT', 'SCHEDULE_ORDER'], default: 'MAIN_MENU'},
        choiceMap: {type: Schema.Types.Mixed, default: {}},
        currentOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'}
    },
    { timestamps: true }
);

export const Session: Model<ISession> = mongoose.model<ISession>("Session", sessionSchema);
