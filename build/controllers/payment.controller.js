import { orderService } from "../services/order.service.js";
import { paymentService } from "../services/payment.service.js";
export const paymentCallbackController = async (req, res) => {
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
        res.redirect("https://clickneat.onrender.com/");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Payment verification failed");
    }
};
//# sourceMappingURL=payment.controller.js.map