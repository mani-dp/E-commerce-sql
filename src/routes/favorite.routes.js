import express from "express";
import { addFavorite, getUserFavorites, removeFavorite } from "../controllers/favorite.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.use('/', getUserFavorites);
favoriteRouter.use("/:user_id", addFavorite);
favoriteRouter.use('/:user_id/product/:product_id', removeFavorite);


export default favoriteRouter;