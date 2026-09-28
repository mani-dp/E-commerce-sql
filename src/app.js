import express from "express";
import authRouter from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRoutes);

export default app;