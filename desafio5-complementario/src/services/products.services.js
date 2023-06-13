import { ProductsModel } from "../dao/models/products.model.js";

class ProductsService {
    
    async getProducts() {
        const products = await ProductsModel.find(
            {}, 
            {
                _id: true,
                title: true,
                description: true,
                code: true,
                price: true,
                stock: true,
                category: true,
                thumbnail: true,
            }
        );
        return products;
    };

    async getProductById(_id) {
        const prod_Id = await ProductsModel.findOne({_id: _id});
        return prod_Id;
    };

    async addProduct({title, description, code, price, stock, category, thumbnail}) {
        const productCreated = await ProductsModel.create({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail,
        });
        return productCreated;
    };

    async updateProduct({ _id, title, description, code, price, stock, category, thumbnail }) {
        const prodUpdated = await ProductsModel.updateOne(
            {
                _id : _id,
            },
            { 
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            }
        );
        return prodUpdated;
    };

    async deleteProduct(_id) {
        const prod_Id = await ProductsModel.deleteOne({
            _id: _id
        });
        return prod_Id;
    };
}

export const productsService = new ProductsService();
