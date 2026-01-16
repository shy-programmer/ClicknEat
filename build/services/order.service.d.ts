import { IOrder, IOrderItem } from "../models/order.model.js";
declare class OrderService {
    createOrder(sessionId: string, items: IOrderItem): Promise<IOrder>;
    addItemsToOrder(orderId: string, newItems: IOrderItem): Promise<IOrder>;
    getCurrentOrder(sessionId: string): Promise<IOrder>;
    getOrderHistory(sessionId: string): Promise<IOrder[]>;
    getOrderById(orderId: string): Promise<IOrder>;
    getOrderByReference(reference: string): Promise<IOrder>;
    attachPaymentDetails(orderId: string, paymentDetails: {
        reference: string;
        authorizationUrl: string;
    }): Promise<IOrder>;
    payOrder(orderId: string): Promise<IOrder>;
    cancelOrder(orderId: string): Promise<void>;
}
export declare const orderService: OrderService;
export {};
//# sourceMappingURL=order.service.d.ts.map