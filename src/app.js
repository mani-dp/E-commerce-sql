import express from "express";
import authRouter from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRouter );
app.use("/api/favorites", favoriteRouter);

export default app;