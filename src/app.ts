import express from "express";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(express.json());

app.use("/api/clickneat/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("ClicknEat API is running...");
});

export default app;
