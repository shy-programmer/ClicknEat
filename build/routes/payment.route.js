import { Router } from "express";
import { paymentCallbackController } from "../controllers/payment.controller.js";
const router = Router();
router.get("/callback", paymentCallbackController);
export default router;
//# sourceMappingURL=payment.route.js.map