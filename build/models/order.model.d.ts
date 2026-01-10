import { Document, Model, Types } from "mongoose";
export interface IOrderItem {
    itemId: Types.ObjectId;
    quantity: number;
}
export interface IOrder extends Document {
    sessionId: string;
    items: IOrderItem[];
    total: number;
    status: "pending" | "paid" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Order: Model<IOrder>;
//# sourceMappingURL=order.model.d.ts.map