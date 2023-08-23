import express from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { isUser } from "../middlewares/auth.js";
export const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.createCart);
cartsRouter.get("/:_cid", cartsController.getCartById);
cartsRouter.post('/:_cid/product/:_pid', isUser, cartsController.addProdToCartById);
cartsRouter.put('/:_cid', cartsController.updateCart);
cartsRouter.put('/:_cid/product/:_pid', cartsController.updateProdQuant);
cartsRouter.delete('/:_cid/product/:_pid', cartsController.removeProdInCart);
cartsRouter.delete('/:_cid', cartsController.emptyCart);

