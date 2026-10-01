import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { createProductValidator } from '../validators/product.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { uploadProductImage } from "../middleware/upload.middleware.js";

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById)

productRouter.post(
    '/',
    authMiddleware,
    adminMiddleware,
    createProductValidator,
    validate,
    uploadProductImage,
    createProduct
);

productRouter.patch('/:id', updateProduct);
productRouter.delete('/;id', deleteProduct);


export default productRouter;