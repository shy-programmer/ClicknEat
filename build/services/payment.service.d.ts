import { IOrder } from "../models/order.model.js";
declare class PaymentService {
    initializePayment(order: IOrder): Promise<{
        authorizationUrl: any;
        reference: any;
    }>;
    verifyPayment(reference: string): Promise<any>;
}
export declare const paymentService: PaymentService;
export {};
//# sourceMappingURL=payment.service.d.ts.map