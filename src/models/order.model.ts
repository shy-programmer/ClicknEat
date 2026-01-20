import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface IOrderItem {
  itemId: Types.ObjectId 
  quantity: number;
}

export interface IOrder extends Document {
  sessionId: string;       
  items: IOrderItem[];
  total: number;
  status: "pending" | "paid" | "scheduled" | "cancelled";
  paymentReference?: string;
  paymentLink?: string;
  scheduledFor?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, default: 1 }
});

const orderSchema: Schema<IOrder> = new Schema(
  {
    sessionId: { type: String, required: true, index: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "scheduled", "cancelled"], default: "pending" },
    paymentReference: { type: String },
    paymentLink: { type: String },
    scheduledFor: { type: Date, required: false }
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
