import express from 'express';
import {
    createCategory, deleteCategory, getCategories,
    getCategoryById,
    updateCategory
} from '../controllers/category.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { categoryValidator } from '../validators/category.validator.js';
import { validate } from '../middleware/validation.middleware.js';

const categoryRoutes = express.Router();

// router.post(
//     "/",
//     authMiddleware,
//     adminMiddleware,
//     categoryValidator,
//     validate,
//     createCategory
// ); 

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.patch("/:id", authMiddleware, adminMiddleware, updateCategory);
categoryRoutes.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);


export default categoryRoutes;