import { carts }  from "../DAO/mongo/carts.mongo.js";
//import { carts } from "../DAO/memory/carts.memory.js";

class CartsService {

    async createCart() {
        const cartCreated = await carts.createCart();
        return cartCreated;
    };

    async getCartById(_cid) {
        const cart_Id = await carts.getCartById(_cid);
        return cart_Id; 
    };

    async getCartByIdRender(_cid) {
        const cart_Id = await carts.getCartByIdRender(_cid);
        return cart_Id;
    };

    async addProdToCartById(_cid, _pid) {
        const cartFinded = await carts.addProdToCartById(_cid, _pid);
        return cartFinded;
    };

    async updateCart(_cid, products) {
        const cartFinded = await carts.updateCart(_cid, products);
        return cartFinded;
    };

    async updateProdQuant(_cid, _pid, quantity) {
        const cartFinded = await carts.updateProdQuant(_cid, _pid, quantity);
        return cartFinded;
    };

    async removeProdInCart(_cid, _pid) {
        const cartFinded = await carts.removeProdInCart(_cid, _pid);
        return cartFinded;
    };

    async emptyCart(_cid) {
        const cartFinded = await carts.emptyCart(_cid);
        return cartFinded;
    };

}

export const cartsService = new CartsService();