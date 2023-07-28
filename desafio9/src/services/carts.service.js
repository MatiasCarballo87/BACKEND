import { cartsModel }  from "../dao/models/carts.model.js";

class CartsService {

    async createCart() {
        const cartCreated = await cartsModel.createCart();
        return cartCreated;
    };

    async getCartById(_cid) {
        const cart_Id = await cartsModel.getCartByIdRender(_cid);
        return cart_Id; 
    };

    async getCartByIdRender(_cid) {
        const cart_Id = await cartsModel.getCartByIdRender(_cid);
        return cart_Id;
    };

    async addProdToCartById(_cid, _pid) {
        const cartFinded = await cartsModel.addProdToCartById(_cid, _pid);
        await cartFinded.save();
        return cartFinded;
    };

    async updateCart(_cid, products) {
        const cartFinded = await cartsModel.updateCart(_cid, products);
        return cartFinded;
    };

    async updateProdQuant(_cid, _pid, quantity) {
        const cartFinded = await cartsModel.updateProdQuant(_cid, _pid, quantity);
        await cartFinded.save();
        return cartFinded;
    };

    async removeProdInCart(_cid, _pid) {
        const cartFinded = await cartsModel.removeProdInCart(_cid, _pid);
        await cartFinded.save();
        return cartFinded;
    };

    async emptyCart(_cid) {
        const cartFinded = await cartsModel.emptyCart(_cid);
        await cartFinded.save();
        return cartFinded;
    };

}

export const cartsService = new CartsService();