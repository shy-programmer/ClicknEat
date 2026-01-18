import express from "express";
import chatRoutes from "./routes/chat.route.js";
import paymentRoutes from "./routes/payment.route.js";
import staffRoutes from "./routes/staff.route.js";
import itemRoutes from "./routes/item.route.js";
import { join } from "path";
const app = express();
app.use(express.json());
app.use("/api/clickneat/chat", chatRoutes);
app.use("/api/clickneat/payment", paymentRoutes);
app.use("/api/clickneat/staff", staffRoutes);
app.use("/api/clickneat/item", itemRoutes);
app.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "src", "public", "chat", "index.html"));
});
app.get("/staff", (req, res) => {
    res.sendFile(join(process.cwd(), "src", "public", "staff", "login.html"));
});
app.get("/staff/dashboard", (req, res) => {
    res.sendFile(join(process.cwd(), "src", "public", "staff", "dashboard.html"));
});
app.get("/menu", (req, res) => {
    res.sendFile(join(process.cwd(), "src", "public", "item", "item.html"));
});
app.use(express.static(join(process.cwd(), "src", "public")));
export default app;
//# sourceMappingURL=app.js.map