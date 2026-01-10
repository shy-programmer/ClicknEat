import mongoose, { Schema } from "mongoose";
const sessionSchema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    state: { type: String, required: true, enum: ['IDLE', 'ITEM_SELECTION', 'CURRENT_ORDER', 'ORDER_HISTORY', 'MAKING_PAYMENT'], default: 'IDLE' },
    choiceMap: { type: Schema.Types.Mixed, default: {} },
    currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });
export const Session = mongoose.model("Session", sessionSchema);
//# sourceMappingURL=session.model.js.map