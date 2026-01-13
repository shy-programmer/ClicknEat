import { Router } from "express";
import { ChatHandlerController } from "../controllers/chatHandler.controller.js";

const router = Router();

router.post("/", ChatHandlerController);

export default router;