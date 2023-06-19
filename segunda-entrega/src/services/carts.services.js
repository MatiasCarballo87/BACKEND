import { CartsModel } from "../dao/models/carts.model.js";
import { ProductsModel } from "../dao/models/products.model.js";


class CartsServices {

    async create({ cart }) {
        const cartCreated = await CartsModel.create({
            cart,
        });
        return cartCreated;
    };

    async getCartById(_id) {
        const cart_Id = await CartsModel.findOne({_id: _id});
        return cart_Id;
    };

    async addProdToCartById(_cid, _pid, quantity) {
        const cartFinded = await CartsModel.find({_cid:_cid});
        cartFinded.products.push({product: _pid});
        const res = await CartsModel.updateOne({_cid: _cid}, cartFinded)        
        return res;
    };

}

export const cartsServices = new CartsServices();