import {Order, IOrder, IOrderItem} from "../models/order.model.js";
import {Item, IItem} from "../models/item.model.js";
import {Session, ISession} from "../models/session.model.js";
import mongoose from "mongoose";

class OrderService {
    async createOrder(sessionId: string, items: IOrderItem) {
        let total = 0;
        const {itemId} = items;
            const item: IItem | null = await Item.findById(itemId);
            if (!item) {
                throw new Error("Item not found");
            }
            total += item.price;

        const newOrder: IOrder = await Order.create({ sessionId, items: [items], total });
        await Session.findOneAndUpdate(
            { sessionId },
            { currentOrderId: newOrder._id }
        );
        return newOrder;
    }

    async addItemsToOrder(orderId: string, newItems: IOrderItem) {
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        let additionalTotal = 0;

            const item: IItem | null = await Item.findById(newItems.itemId);
            if (!item) {
                throw new Error(`Item with ID ${newItems.itemId} not found`);
            }
            additionalTotal += item.price * newItems.quantity;
            if (order.items.some(oi => oi.itemId.toString() === newItems.itemId.toString())) {
                const existingOrderItem = order.items.find(oi => oi.itemId.toString() === newItems.itemId.toString());
                if (existingOrderItem) {
                    existingOrderItem.quantity += newItems.quantity;
                }
            } else {
                order.items.push(newItems);
            }
        order.total += additionalTotal;
        await order.save();
        return order;
    }


    async getCurrentOrder(sessionId: string) {
        const order: IOrder | null = await Order.findOne({ sessionId, status: "pending" }).populate('items.itemId');
        if (!order) {
            throw new Error("No current order found");
        }
        return order;
    }

    async getOrderHistory(sessionId: string) {
        const orders: IOrder[] = await Order.find({sessionId, status: { $in: ["paid", "cancelled"] } }).populate('items.itemId');
        return orders;
    }
    

    async payOrder(orderId: string) {
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = "paid";
        await order.save();
        return order;
    }

    async cancelOrder(orderId: string) {
        const order: IOrder | null = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return;
    }

}

export const orderService = new OrderService();