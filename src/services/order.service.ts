import {Order, IOrder, IOrderItem} from "../models/order.model";
import {Item, IItem} from "../models/item.model";
import mongoose from "mongoose";

class OrderService {
    async createOrder(sessionId: string, items: IOrderItem[]) {
        let total = 0;
        for (const orderItem of items) {
            const item: IItem | null = await Item.findById(orderItem.itemId);
            if (!item) {
                return {
                    code: 404,
                    message: `Item with ID ${orderItem.itemId} not found`
                };
            }
            total += item.price * orderItem.quantity;
        }

        const newOrder: IOrder = await Order.create({ sessionId, items, total });
        return {
            code: 201,
            data: newOrder,
            message: "Order created successfully"
        };
    }

    async addItemsToOrder(orderId: string, newItems: IOrderItem[]) {
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            return {
                code: 404,
                message: "Order not found"
            };
        }
        let additionalTotal = 0;
        for (const orderItem of newItems) {
            const item: IItem | null = await Item.findById(orderItem.itemId);
            if (!item) {
                return {
                    code: 404,
                    message: `Item with ID ${orderItem.itemId} not found`
                };
            }
            additionalTotal += item.price * orderItem.quantity;
            order.items.push(orderItem);
        }
        order.total += additionalTotal;
        await order.save();
        return {
            code: 200,
            data: order,
            message: "Items added to order successfully"
        };
    }


    async getCurrentOrder(sessionId: string) {
        const order: IOrder | null = await Order.findOne({ sessionId, status: "pending" });
        if (!order) {
            return {
                code: 404,
                message: "No current order found for this session"
            };
        }
        return {
            code: 200,
            data: order,
            message: "Current order retrieved successfully"
        };
    }

    async getOrderHistory(sessionId: string) {
        const orders: IOrder[] = await Order.find({ sessionId});
        return {
            code: 200,
            data: orders,
            message: "Order history retrieved successfully"
        };
    }
    

    async payOrder(orderId: string) {
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            return {
                code: 404,
                message: "Order not found"
            };
        }
        order.status = "paid";
        await order.save();
        return {
            code: 200,
            data: order,
            message: "Order paid successfully"
        };
    }

    async deleteOrder(orderId: string) {
        const order: IOrder | null = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return {
                code: 404,
                message: "Order not found"
            };
        }
        return {
            code: 200,
            message: "Order deleted successfully"
        };
    }

}

export const orderService = new OrderService();