import express from "express";
import { cartsServices } from "../services/carts.services.js";
export const cartsRouter = express.Router();


cartsRouter.post('/', async (req, res) => {
    try {
        const { cart } = req.body;
        const cartCreated = await cartsServices.createCart({
            cart,
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

/* cartsRouter.get('/:_cid', async (req, res) => {
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
}); */

cartsRouter.get("/:_cid", async (req, res) => {
    try {
        const { _cid } = req.params;
        const cartId = await cartsServices.getCartById(_cid);
        console.log(cartId)
        const productsInCart = cartId.products.map((prod) => prod.toObject());
        return res.status(200).render("carts.handlebars", {productsInCart});
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
    });
}});

cartsRouter.post('/:_cid/product/:_pid', async (req, res) => {
    try {
        const { _cid, _pid } = req.params;
        const prodsInCart = await cartsServices.addProdToCartById(_cid, _pid);
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


cartsRouter.put('/:_cid', async (req, res) => {
    try {
        const { _cid, } = req.params;
        const { products } = req.body;
        const cart = await cartsServices.updateCart(_cid, products);
        if (cart) {
            return res.status(201).json({ status: "success", msg: "added product", payload: cart });
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

cartsRouter.put('/:_cid/product/:_pid', async (req, res) => {
    try {
        const { _cid, _pid } = req.params;
        const { quantity } = req.body;
        const prodsInCart = await cartsServices.updateProdQuant(_cid, _pid, quantity);
        if (prodsInCart) {
            return res.status(201).json({ status: "success", msg: "added product", payload: prodsInCart });
        }else {
            return res.status(404).json({ status: "error", msg: "ID cart/product does not exist", payload: {} });
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

cartsRouter.delete('/:_cid/product/:_pid', async (req, res) => {
    try {
        const { _cid, _pid } = req.params;
        const prodsInCart = await cartsServices.removeProdInCart(_cid, _pid);
        if (prodsInCart) {
            return res.status(201).json({ status: "success", msg: "added product", payload: prodsInCart });
        }else {
            return res.status(404).json({ status: "error", msg: "ID cart/product does not exist", payload: {} });
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

cartsRouter.delete('/:_cid', async (req, res) => {
    try {
        const { _cid } = req.params;
        const cleanCart = await cartsServices.emptyCart(_cid);
        if (cleanCart) {
            return res.status(201).json({ status: "success", msg: "added product", payload: cleanCart });
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