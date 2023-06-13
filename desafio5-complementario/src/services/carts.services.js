import { CartsModel } from "../dao/models/carts.model.js";

class CartsServices {

    async create({ products }) {
        const cartCreated = await CartsModel.create({
            products,
        });
        return cartCreated;
    };

    async getCartById(_id) {
        const cart_Id = await CartsModel.findOne({_id: _id});
        return cart_Id;
    }

}

export const cartsServices = new CartsServices();