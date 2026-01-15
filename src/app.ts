import express from "express";
import chatRoutes from "./routes/chat.routes.js";
import {join} from "path";

const app = express();

app.use(express.json());

app.use("/api/clickneat/chat", chatRoutes);

app.use(express.static(join(process.cwd(), "src", "public")));


export default app;
