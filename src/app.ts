import express from "express";
import chatRoutes from "./routes/chat.route.js";
import paymentRoutes from "./routes/payment.route.js";
import {join} from "path";

const app = express();

app.use(express.json());

app.use("/api/clickneat/chat", chatRoutes);
app.use("/api/clickneat/payment", paymentRoutes);

app.use(express.static(join(process.cwd(), "src", "public")));


export default app;
