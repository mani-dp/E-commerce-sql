import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById)
productRouter.post('/', createProduct);
productRouter.patch('/:id', updateProduct);
productRouter.delete('/;id', deleteProduct);


export default productRouter;