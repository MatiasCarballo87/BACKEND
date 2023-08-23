import { cartsService } from "../services/carts.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";
import { loggerDev, loggerProd } from "../utils/logger.js";
import env from "../config.env.js";

const PORT = env.port;

class CartsController {

    createCart = async (req, res) => {
        try {
            const { cart } = req.body;
            const cartCreated = await cartsService.createCart({cart});
            if (!cart) {
                return  CustomError.createError({
                    name: "TYPE ERROR",
                    cause: "Something incomplete",
                    message: "Failed Cart creation",
                    code: EErrors.CART_ERROR,
                });
            }
            return res.status(201).json({ status: "success", msg: "cart created", payload: cartCreated });
        } catch(e) {
            return res.status(500).json({
            status: "Error",
            error: e.name,
            cause: e.cause,
            });
        }
    };

    getCartById = async (req, res) => {
        try{
            const { _cid } = req.params;
            const cartId = await cartsService.getCartById(_cid);
            if(PORT == 8080){
                loggerDev.debug(cartId);
            }
            if (cartId){
                return res.status(200).json({ status: "success", msg: "ID cart finded", payload: cartId });
            } else {
                return  CustomError.createError({
                name: "ID TYPE ERROR",
                cause: "User put wrong ID",
                message: "ID cart does not exist",
                code: EErrors.ID_ERROR,
                });
            }
        } catch (e) {
            if(PORT == 8080){
                loggerDev.info(e);
            }
            return res.status(500).json({
                status: "Error",
                error: e.name,
                cause: e.cause,
            });
        }
    };
   
    getCartByIdRender = async (req, res) => {
        try {
            const { _cid } = req.params;
            const cartId = await cartsService.getCartByIdRender(_cid);
            return res.status(200).render("carts.handlebars",{ cartId });
        } catch(e) {
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
                return  CustomError.createError({
                    name: "PRODUCT ERROR",
                    cause: "User put wrong product ID",
                    message: "ID product does not exist",
                    code: EErrors.PRODUCT_ERROR,
                });    
            }
        } catch(e) {
            if(PORT == 8080){
                loggerDev.info(e);
            }
            return res.status(500).json({
                status: "Error",
                error: e.name,
                cause: e.cause,
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
            if(PORT == 3000){
                loggerProd.warn("Could not update cart");
            }
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
            if(PORT == 3000){
                loggerProd.warn("Could not update product quantity");
            }
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
            if(PORT == 3000){
                loggerProd.warn("Could not remove product");
            }
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
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

    buyCart = async (req, res) => {
        try {
            const { _cid } = req.params;
            const cartBought = await this.buyCart(_cid);
            return cartBought;
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