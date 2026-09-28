import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);


export default categoryRoutes;