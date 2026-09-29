import express from "express";
import { addFavorite, getUserFavorites, removeFavorite } from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const favoriteRouter = express.Router();

favoriteRouter.get('/',authMiddleware, getUserFavorites);
favoriteRouter.post("/:user_id",authMiddleware, addFavorite);
favoriteRouter.delete('/:user_id/product/:product_id',authMiddleware, removeFavorite);


export default favoriteRouter;