import { cartsMongoose} from "./models/carts.mongoose.js";
import { productsMongoose } from "./models/products.mongoose.js";

class Carts {

    async createCart() {
        const cartCreated = await cartsMongoose.create({});
        return cartCreated;
    };

    async getCartById(_cid) {
        const cart_Id = await cartsMongoose.findById(_cid);
        return cart_Id;
    };

    async getCartByIdRender(_cid) {
        const cart_Id = await cartsMongoose.findById(_cid).populate("products.product");
        const productsInCart = cart_Id.products.map((prod) => prod.toObject());
        return productsInCart;
    };

    async addProdToCartById(_cid, _pid) {
        const cartFinded = await cartsMongoose.findById(_cid);
        const product = await productsMongoose.findById(_pid);
        cartFinded.products.push({ product: product._id, quantity: 1 });
        await cartFinded.save();
        return cartFinded;
    };

    async updateCart(_cid, products) {
        const cartFinded = await cartsMongoose.findByIdAndUpdate(
            _cid, 
            {products},
            {new: true}
        );
        return cartFinded;
    };

    async updateProdQuant(_cid, _pid, quantity) {
        const cartFinded = await cartsMongoose.findById(_cid);
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
        const cartFinded = await cartsMongoose.findById(_cid);
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
        const cartFinded = await cartsMongoose.findById(_cid);
        cartFinded.products = [];
        await cartFinded.save();
        return cartFinded;
    };

    async buyCart(_cid) {
        const cartFinded = await cartsMongoose.findById(_cid);
    }

}

export const carts = new Carts();