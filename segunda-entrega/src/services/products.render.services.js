import productsModel from "../dao/models/products.model.js";

class ProductsRenderService {

    async getAllProductsRender(limit, pages, category, orderBy) {
        const query = {};
        if (category) {
        query.category = category;
        }

        const sortOptions = {};
        if (orderBy === "asc") {
        sortOptions.price = 1;
        } else if (orderBy === "desc") {
        sortOptions.price = -1;
        }

        const queryResult = await productsModel.paginate(query, {
        page: pages || 1,
        limit: limit || 5,
        sort: sortOptions,
        });

        return queryResult;
    };

};

export const productsRenderService = new ProductsRenderService();