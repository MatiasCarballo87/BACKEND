import express from "express";
import CartManager from '../class/cartManager.js';
const cartMan = new CartManager();
export const cartsRouter = express.Router();


cartsRouter.post('/', (req, res) => {
    const cartAdd = cartMan.createCart();
    return res.status(201).json({ status: "success", msg: "added product", data: cartAdd });
});

cartsRouter.get('/:cid', (req, res) => {
    const id = req.params.cid;
    const cartId = cartMan.getCartById(id);
    if (cartId) {
        return res.status(200).json({ status: "success", msg: "ID product finded", data: cartId });
    }else {
        return res.status(404).json({ Error: 'ID does not exist'});
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const quantity = 1;
    const prodsInCart = cartMan.addProductToCartById(cid, pid, quantity)
    if (prodsInCart) {
        return res.status(201).json({ status: "success", msg: "added product", data: prodsInCart });
    }else {
        return res.status(404).json({ Error: 'ID does not exist'});
    }
});



