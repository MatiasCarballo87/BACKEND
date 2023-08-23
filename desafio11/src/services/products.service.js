import { products } from "../DAO/mongo/products.mongo.js";
//import { products } from "../DAO/memory/products.memory.js";

class ProductsService {

    async getAllProductsRender(limit, pages, category, orderBy) {
        const renderProds = await products.getAllProductsRender(limit, pages, category, orderBy);
        return renderProds;
    }

    async getAll() {
        const allProducts = await products.getAll();
        return allProducts;
    };
    
    async getProductsParams(queryParams) {
        const productsParams = await products.getProductsParams(queryParams);
        return productsParams;
    };

    async getProductById(_pid) {
        const prod_Id = await products.getProductById(_pid);
        return prod_Id;
    };

    async addProduct(product) {
        const productCreated = await products.addProduct(product);
        return productCreated;
    };

    async updateProduct(_pid, title, description, code, price, stock, category, thumbnail) {
        const prodUpdated = await products.updateProduct(_pid, title, description, code, price, stock, category, thumbnail);
        return prodUpdated;
    };

    async deleteProduct(_pid) {
        const prod_Id = await products.deleteProduct(_pid);
        return prod_Id;
    };
}

export const productsService = new ProductsService();
