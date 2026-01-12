import { Router } from "express";
import { ChatHandlerController } from "../controllers/chatHandler.controller";

const router = Router();

router.post("/", ChatHandlerController);

export default router;