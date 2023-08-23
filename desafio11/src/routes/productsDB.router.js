import express from "express";
import { productsController } from "../controllers/products.controller.js";
import { isUser } from "../middlewares/auth.js";
export const productsDBRouter = express.Router();

productsDBRouter.get("/", isUser, productsController.getAllProductsRender);
