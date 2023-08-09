import { cartsService } from "../services/carts.service.js";

class CartsController {

    createCart = async (req, res) => {
        try {
            const { cart } = req.body;
            const cartCreated = await cartsService.createCart({
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
    };

    getCartById = async (req, res) => {
        try{
            const { _cid } = req.params;
            const cartId = await cartsService.getCartById(_cid);
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
    };

    getCartByIdRender = async (req, res) => {
        try {
            const { _cid } = req.params;
            const cartId = await cartsService.getCartByIdRender(_cid);
            return res.status(200).render("carts.handlebars",{ cartId });
        } catch(e) {
            console.log(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

    addProdToCartById = async (req, res) => {
        try {
            const { _cid, _pid } = req.params;
            const prodsInCart = await cartsService.addProdToCartById(_cid, _pid);
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
    };

    updateCart = async (req, res) => {
        try {
            const { _cid, } = req.params;
            const { products } = req.body;
            const cart = await cartsService.updateCart(_cid, products);
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
    };

    updateProdQuant = async (req, res) => {
        try {
            const { _cid, _pid } = req.params;
            const { quantity } = req.body;
            const newQuantityProd = await cartsService.updateProdQuant(_cid, _pid, quantity);
            if (newQuantityProd) {
                return res.status(201).json({ status: "success", msg: "added product", payload: newQuantityProd });
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
    };

    removeProdInCart = async (req, res) => {
        try {
            const { _cid, _pid } = req.params;
            const prodsInCart = await cartsService.removeProdInCart(_cid, _pid);
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
    };

    emptyCart = async (req, res) => {
        try {
            const { _cid } = req.params;
            const cleanCart = await cartsService.emptyCart(_cid);
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
    };
}

export const cartsController = new CartsController();