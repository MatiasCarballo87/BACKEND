import cartsModel  from "../dao/models/carts.model.js";
import productsModel from "../dao/models/products.model.js";


class CartsServices {

    async createCart({ cart }) {
        const cartCreated = await cartsModel.create({
            cart,
        });
        return cartCreated;
    };

    async getCartById(_cid) {
        const cart_Id = await cartsModel.findById(_cid).populate("products.product");
        return cart_Id;
    };

    async addProdToCartById(_cid, _pid) {
        const cartFinded = await cartsModel.findById(_cid);
        const product = await productsModel.findById(_pid);
        cartFinded.products.push({ product: product._id, quantity: 1 });
        await cartFinded.save();
        return cartFinded;
    };

    async updateCart(_cid, products) {
        const cartFinded = await cartsModel.findByIdAndUpdate(
            _cid, 
            {products},
            {new: true}
        );
        return cartFinded;
    };

    async updateProdQuant(_cid, _pid, quantity) {
        const cartFinded = await cartsModel.findById(_cid);
        const indexProd = cartFinded.products.findIndex(
            (p) => p.product == _pid
        );
        if (indexProd === -1){
            console.log("Error, product not founded");
        }
        cartFinded.products[indexProd].quantity = quantity;
        await cartFinded.save();
        return cartFinded;
    };

    async removeProdInCart(_cid, _pid) {
        const cartFinded = await cartsModel.findById(_cid);
        const indexProd = cartFinded.products.findIndex(
            (p) => p.product == _pid
        );
        if (indexProd === -1){
            console.log("Error, product not founded");
        }
        cartFinded.products.splice(indexProd, 1);
        await cartFinded.save();
        return cartFinded;
    };

    async emptyCart(_cid) {
        const cartFinded = await cartsModel.findById(_cid);
        cartFinded.products = [];
        await cartFinded.save();
        return cartFinded;
    };

}

export const cartsServices = new CartsServices();