import express from "express";
import itemController from "../controllers/item.controller.js";
import { ValidateItem } from "../validators/item.validator.js";
import { AuthenticateStaff, AuthorizeAdmin } from "../middlewares/staff.middleware.js";
const router = express.Router();
router.get("/", itemController.getAllItems);
router.get("/available", itemController.getAvailableItems);
router.get("/:itemId", itemController.getItemById);
router.post("/", AuthenticateStaff, AuthorizeAdmin, ValidateItem, itemController.createItem);
router.put("/:itemId", AuthenticateStaff, AuthorizeAdmin, itemController.updateItem);
router.patch("/:itemId/toggle", AuthenticateStaff, itemController.toggleItemAvailability);
export default router;
//# sourceMappingURL=item.route.js.map