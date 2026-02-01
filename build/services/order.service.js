import { Order } from "../models/order.model.js";
import { Item } from "../models/item.model.js";
import { Session } from "../models/session.model.js";
class OrderService {
    async createOrder(sessionId, items) {
        let total = 0;
        const { itemId } = items;
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        total += item.price;
        const newOrder = await Order.create({ sessionId, items: [items], total });
        await Session.findOneAndUpdate({ sessionId }, { currentOrderId: newOrder._id });
        return newOrder;
    }
    async addItemsToOrder(orderId, newItems) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        let additionalTotal = 0;
        const item = await Item.findById(newItems.itemId);
        if (!item) {
            throw new Error(`Item with ID ${newItems.itemId} not found`);
        }
        additionalTotal += item.price * newItems.quantity;
        if (order.items.some(oi => oi.itemId.toString() === newItems.itemId.toString())) {
            const existingOrderItem = order.items.find(oi => oi.itemId.toString() === newItems.itemId.toString());
            if (existingOrderItem) {
                existingOrderItem.quantity += newItems.quantity;
            }
        }
        else {
            order.items.push(newItems);
        }
        order.total += additionalTotal;
        await order.save();
        return order;
    }
    async getCurrentOrder(sessionId) {
        const order = await Order.findOne({ sessionId, status: { $in: ["pending", "scheduled"] } }).populate('items.itemId');
        if (!order) {
            throw new Error("No current order found");
        }
        return order;
    }
    async getOrderHistory(sessionId) {
        const orders = await Order.find({ sessionId, status: { $in: ["paid", "cancelled"] } }).populate('items.itemId');
        return orders;
    }
    async getOrderById(orderId) {
        const order = await Order.findById(orderId).populate('items.itemId');
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async getOrderByReference(reference) {
        const order = await Order.findOne({ paymentReference: reference });
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async scheduleOrder(orderId, scheduledFor) {
        const order = await Order.findByIdAndUpdate(orderId, { status: "scheduled", scheduledFor }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async attachPaymentDetails(orderId, paymentDetails) {
        const { reference, authorizationUrl } = paymentDetails;
        const order = await Order.findByIdAndUpdate(orderId, { paymentReference: reference, paymentLink: authorizationUrl }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async payOrder(orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        order.status = "paid";
        await order.save();
        return order;
    }
    async cancelOrder(orderId) {
        const order = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return;
    }
}
export const orderService = new OrderService();
//# sourceMappingURL=order.service.js.map