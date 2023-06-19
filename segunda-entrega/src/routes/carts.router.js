import express from "express";
import { cartsServices } from "../services/carts.services.js";
import { productsService } from "../services/products.services.js";
export const cartsRouter = express.Router();


cartsRouter.post('/', async (req, res) => {
    try {
        const { products } = req.body;
        const cartCreated = await cartsServices.create({
            products,
        });
        return res.status(201).json({ status: "success", msg: "cart created", payload: cartCreated });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});

cartsRouter.get('/:_cid', async (req, res) => {
    try{
        const { _cid } = req.params;
        const cartId = await cartsServices.getCartById(_cid);
        if (cartId) {
            return res.status(200).json({ status: "success", msg: "ID cart finded", payload: cartId });
        }else {
            return res.status(404).json({ status: "error", msg: "ID cart does not exist", payload: {} });
        }
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});

cartsRouter.post('/:_cid/product/:_pid', async (req, res) => {
    try {
        const quantity = 1;
        const { _cid, _pid } = req.params;
        await cartsServices.getCartById(_cid);
        await productsService.getProductById(_pid);
        const prodsInCart = cartsServices.addProdToCartById(_cid, _pid, quantity);
        if (prodsInCart) {
            return res.status(201).json({ status: "success", msg: "added product", payload: prodsInCart });
        }else {
            return res.status(404).json({ status: "error", msg: "ID cart does not exist", payload: {} });
        }
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});



