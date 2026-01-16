import { Request, Response } from "express";
import { sessionService } from "../services/session.service.js";
import { itemService } from "../services/item.service.js";
import { orderService } from "../services/order.service.js";
import { paymentService } from "../services/payment.service.js";
import { menuBuilder } from "../utils/menuBuilder.js";

export const paymentCallbackController = async (
    req: Request,
    res: Response
) => {
    try {
        const { reference } = req.query;

        if (!reference || typeof reference !== "string") {
            return res.status(400).send("Invalid payment reference");
        }

        const paymentData = await paymentService.verifyPayment(reference);

        if (paymentData.status !== "success") {
            return res.send("Payment not successful");
        }

        const order = await orderService.getOrderByReference(reference);

        if (!order) {
            return res.send("Order not found");
        }

        await orderService.payOrder(order._id.toString());

        res.redirect("http://localhost:3000/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Payment verification failed");
    }
};


