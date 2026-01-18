import express from "express";
import itemController from "../controllers/item.controller.js";
import { AuthenticateStaff, AuthorizeAdmin } from "../middlewares/staff.middleware.js";

const router = express.Router();

router.get("/", itemController.getAllItems);
router.get("/available", itemController.getAvailableItems);
router.get("/:itemId", itemController.getItemById);

router.post("/", AuthenticateStaff, AuthorizeAdmin, itemController.createItem);
router.put("/:itemId", AuthenticateStaff, AuthorizeAdmin, itemController.updateItem);
router.patch(
  "/:itemId/toggle",
  AuthenticateStaff,
  itemController.toggleItemAvailability
);

export default router;
