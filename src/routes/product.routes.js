import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById)
productRouter.post('/',authMiddleware, adminMiddleware, createProduct);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/;id', deleteProduct);


export default productRouter;