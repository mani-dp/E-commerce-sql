import express from "express";
import { addFavorite, getUserFavorites, removeFavorite } from "../controllers/favorite.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.get('/', getUserFavorites);
favoriteRouter.post("/:user_id", addFavorite);
favoriteRouter.delete('/:user_id/product/:product_id', removeFavorite);


export default favoriteRouter;