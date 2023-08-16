import { v4 as uuidv4 } from 'uuid';

class Carts {
    constructor() {
        this.carts = [];
    }

    createCart() {
        const carts = this.carts;
        carts.push({ products: [], id: uuidv4()});
        return carts;
    };

    getCartById(_cid) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        return cart_Id;
    };

    addProdToCartById(_cid, _pid) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        const prod_Id = cart_Id.products.find(prod => prod.id == _pid);
        const prodAdd = cart_Id.products.push({ product: prod_Id._pid, quantity: 1});
        return prodAdd;
    };

    updateCart(_cid, products) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        if (cart_Id) {
            cart_Id.products = products;
            return cart_Id;
        }
    };

    updateProdQuant(_cid, _pid, quantity) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        const indexProd = cart_Id.products.findIndex(
            (p) => p.product == _pid
        );
        if (indexProd === -1){
            console.log("Error, product not founded");
        }
        cart_Id.products[indexProd].quantity = quantity;
        return cart_Id;
    };

    removeProdInCart(_cid, _pid) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        const indexProd = cart_Id.products.findIndex(
            (p) => p.product == _pid
        );
        if (indexProd === -1){
            console.log("Error, product not founded");
        }
        cart_Id.products.splice(indexProd, 1);
        return cart_Id;
    };

    emptyCart(_cid) {
        const carts = this.carts;
        const cart_Id = carts.find((cart) => cart.id == _cid);
        if (cart_Id) {cart_Id.products = []};
        return cart_Id;
    };

}

export const carts = new Carts();

