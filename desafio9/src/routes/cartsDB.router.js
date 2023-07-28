import express from "express";
import { cartsController } from "../controllers/carts.controller.js";
export const cartsDBRouter = express.Router();

cartsDBRouter.get("/:_cid", cartsController.getCartByIdRender);
