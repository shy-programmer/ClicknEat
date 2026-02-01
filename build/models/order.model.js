import mongoose, { Schema } from "mongoose";
const orderItemSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, default: 1 }
});
const orderSchema = new Schema({
    sessionId: { type: String, required: true, index: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "scheduled", "cancelled"], default: "pending" },
    paymentReference: { type: String },
    paymentLink: { type: String },
    scheduledFor: { type: Date, required: false }
}, { timestamps: true });
export const Order = mongoose.model("Order", orderSchema);
//# sourceMappingURL=order.model.js.map