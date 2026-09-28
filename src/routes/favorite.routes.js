import express from "express";
import { addFavorite, getUserFavorites, removeFavorite } from "../controllers/favorite.controller.js";

const favoriteRouter = express.Router();

favoriteRouter.use("/", addFavorite);
favoriteRouter.use('/', getUserFavorites);
favoriteRouter.use('/', removeFavorite);


export default favoriteRouter;