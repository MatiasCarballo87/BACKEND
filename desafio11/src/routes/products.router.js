import express from "express";
import { productsController } from "../controllers/products.controller.js";
/* import { isAdmin } from "../middlewares/auth.js"; */
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/', productsController.getProductsParams);
productsRouter.get('/:_pid', productsController.getProductById);
productsRouter.post('/', /* isAdmin, */ productsController.addProduct);
productsRouter.put('/:_pid', /* isAdmin, */ productsController.updateProduct);
productsRouter.delete('/:_pid', /* isAdmin, */ productsController.deleteProduct);
