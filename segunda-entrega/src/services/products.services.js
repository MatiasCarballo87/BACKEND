import  productsModel  from "../dao/models/products.model.js";

class ProductsService {
    
    async getProducts(queryParams) {
        const { page = 1, limit = 10, sort, category, stock } = queryParams;
        const query = {};
        if(query){
            category ? query.category = category : null;
            stock ? query.stock = { $gt: +stock} : null;
        };
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort } : null
        }

        const result = await productsModel.paginate(query, options);

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? result.prevPage : null,
            nextPage: result.hasNextPage ? result.nextPage : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null,
        };
        return response;
    };

    async getProductById(_id) {
        const prod_Id = await productsModel.findOne({_id: _id});
        return prod_Id;
    };

    async addProduct({title, description, code, price, stock, category, thumbnail}) {
        const productCreated = await productsModel.create({
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
        const prodUpdated = await productsModel.updateOne(
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
        const prod_Id = await productsModel.deleteOne({
            _id: _id
        });
        return prod_Id;
    };
}

export const productsService = new ProductsService();
