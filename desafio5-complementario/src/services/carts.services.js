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

    async addProdToCartById(_id, _pid, quantity) {
        const cartFinded = await CartsModel.findById(_id);
        const product = cartFinded.products.find((e) => e._pid == _pid);
        if (!product) {
            cartFinded.products.push({ _pid: _pid, quantity });
        } else {
            product.quantity += quantity;
        }
        await cartFinded.save();
        return cartFinded;
    };

}

export const cartsServices = new CartsServices();