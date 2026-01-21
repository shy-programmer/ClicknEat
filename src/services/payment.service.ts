import { IOrder } from "../models/order.model.js";
import { orderService } from "./order.service.js";  

const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

class PaymentService {
  async initializePayment(order: IOrder) {
    const reference = `clickneat_${order._id}_${Date.now()}`;

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@clickneat.com", 
        amount: Math.round(order.total * 100), 
        reference,
        metadata: {
          orderId: order._id.toString(),
          sessionId: order.sessionId,
        },
        callback_url: "https://clickneat.onrender.com/api/clickneat/payment/callback",
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Payment initialization failed");
    }

    await orderService.attachPaymentDetails(order._id.toString(), {
      reference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
    }); 

    return {
      authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
        };
  }

  async verifyPayment(reference: string) {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Payment verification failed");
    }
    return data.data;
  }
}

export const paymentService = new PaymentService();
