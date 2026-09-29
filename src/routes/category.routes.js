import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/",authMiddleware, adminMiddleware, createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.patch("/:id",authMiddleware, adminMiddleware, updateCategory);
categoryRoutes.delete("/:id",authMiddleware, adminMiddleware, deleteCategory);


export default categoryRoutes;