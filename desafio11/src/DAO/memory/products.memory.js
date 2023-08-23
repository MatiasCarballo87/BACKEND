import { v4 as uuidv4 } from 'uuid';

class Products {
    constructor() {
        this.products = [];
    }

    getAll() {
        const products = this.products;
        return products;
    };

    addProduct(product) {
        const allProducts = this.products;
        const _id = uuidv4();
        product._id = _id;
        allProducts.push({...product});
        return product;
    };

    getProductById(_pid) {
        const products = this.products;
        const prod_Id = products.find((prod) => prod._id == _pid);
        console.log(prod_Id);
        return prod_Id;
    };

    updateProduct({_pid, title, description, code, price, stock, category, thumbnail}) {
        const products = this.products;
        const prod_Id = products.find((prod) => prod._id == _pid);
        if (prod_Id) { 
            prod_Id.title = title;
            prod_Id.description = description;
            prod_Id.code = code;
            prod_Id.price = price;
            prod_Id.stock = stock;
            prod_Id.category = category;
            prod_Id.thumbnail = thumbnail;
            return prod_Id;
        }
    };

    deleteProduct(_pid) {
        const products = this.products;
        const productIndex = products.findIndex((prod) => prod._id == _pid);
        const prodDelete = products.splice(productIndex, 1);
        return prodDelete;
    }
};

export const products = new Products();
