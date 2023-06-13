import express from "express";
import { cartsServices } from "../services/carts.services.js";
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
            return res.status(200).json({ status: "success", msg: "ID cart finded", data: cartId });
        }else {
            return res.status(404).json({ Error: 'ID does not exist'});
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

/* cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const quantity = 1;
    const prodsInCart = cartMan.addProductToCartById(cid, pid, quantity)
    if (prodsInCart) {
        return res.status(201).json({ status: "success", msg: "added product", data: prodsInCart });
    }else {
        return res.status(404).json({ Error: 'ID does not exist'});
    }
}); */



