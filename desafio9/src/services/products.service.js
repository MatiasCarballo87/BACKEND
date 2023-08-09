import { productsModel } from "../dao/models/products.model.js";

class ProductsService {

    async getAllProductsRender(limit, pages, category, orderBy) {
        const renderProds = await productsModel.getAllProductsRender(limit, pages, category, orderBy);
        /* console.log(renderProds); */
        return renderProds;
    }

    async getAll() {
        const products = await productsModel.getAll();
        return products;
    };
    
    async getProductsParams(queryParams) {
        const productsParams = await productsModel.getProductsParams(queryParams);
        return productsParams;
    };

    async getProductById(_pid) {
        const prod_Id = await productsModel.getProductById(_pid);
        return prod_Id;
    };

    async addProduct() {
        const productCreated = await productsModel.addProduct();
        return productCreated;
    };

    async updateProduct() {
        const prodUpdated = await productsModel.updateProduct();
        return prodUpdated;
    };

    async deleteProduct() {
        const prod_Id = await productsModel.deleteProduct();
        return prod_Id;
    };
}

export const productsService = new ProductsService();
