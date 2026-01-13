import mongoose, { Schema } from "mongoose";
const sessionSchema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    state: { type: String, required: true, enum: ['MAIN_MENU', 'ITEM_SELECTION', 'ITEM_ADDED', 'CURRENT_ORDER', 'ORDER_HISTORY', 'CHECKOUT_ORDER', 'MAKING_PAYMENT'], default: 'MAIN_MENU' },
    choiceMap: { type: Schema.Types.Mixed, default: {} },
    currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });
export const Session = mongoose.model("Session", sessionSchema);
//# sourceMappingURL=session.model.js.map