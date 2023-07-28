import { productsMongoose } from "./mongoose/products.mongoose.js";

class ProductsModel {

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

        const queryResult = await productsMongoose.paginate(query, {
        page: pages || 1,
        limit: limit || 5,
        sort: sortOptions,
        });

        return queryResult;
        
        /* const {totalPages, totalDocs, page, hasPrevPage, hasNextPage, prevPage, nextPage} = queryResult;
        const prodsRender = queryResult.docs.map((doc) => doc.toObject());
        return {prodsRender,totalPages, totalDocs, page, hasPrevPage, hasNextPage, prevPage, nextPage}; */
    };

    async getAll() {
        const products = await productsMongoose.find({}).lean();
        return products;
    };

    async getProductsParams(queryParams) {
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
        const result = await productsMongoose.paginate(query, options);
        
        const response = {
            status: "success",
            payload: result.docs,
            totalDocs: result.totalDocs,
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

    async getProductById(_pid) {
        const prod_Id = await productsMongoose.findOne({_id: _pid});
        return prod_Id;
    };

    async addProduct({title, description, code, price, stock, category, thumbnail}) {
        const productCreated = await productsMongoose.create({
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

    async updateProduct({ _pid, title, description, code, price, stock, category, thumbnail }) {
        const prodUpdated = await productsMongoose.updateOne(
            {
                _id : _pid,
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

    async deleteProduct(_pid) {
        const prod_Id = await productsMongoose.deleteOne({
            _id: _pid
        });
        return prod_Id;
    }

}

export const productsModel = new ProductsModel();
