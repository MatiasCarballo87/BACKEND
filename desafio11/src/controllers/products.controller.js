import { productsService } from "../services/products.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";
import { loggerDev, loggerProd } from "../utils/logger.js";
import env from "../config.env.js";

const PORT = env.port;

class ProductsController {

    getAllProductsRender = async (req, res) => {
        try {
            const user = req.user.firstName;
            const  { limit, pages, category, orderBy }  = req.query;
            const products = await productsService.getAllProductsRender(limit, pages, category, orderBy);
            const { totalPages, totalDocs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = products;
            const productsRender = products.docs.map((doc) => doc.toObject());
            return res.status(200).render("products.handlebars", { 
                productsRender,
                totalPages,
                totalDocs,
                page,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                user
                }
            );
        } catch(e) {
            return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }};

    getAll = async (_, res) => {
        try {
            const allProducts = await productsService.getAll();
            return res.status(200).json({ status: "success", msg: "All Products", payload: allProducts });
        } catch(e) {
            return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }};

    getProductsParams = async (req, res) => {
        try {
            const queryParams = req.query;
            const response = await productsService.getProductsParams(queryParams);
            return res.status(200).json({ status: "success", msg: "All Products", payload: response }); 
        } catch(e) {
            return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
          });
        }
    };

    getProductById = async ( req, res) => {
        try {
            const { _pid } = req.params;
            const prod_Id = await productsService.getProductById(_pid);
            if (prod_Id) {
                return res.status(200).json({ status: "success", msg: "ID product finded", payload: prod_Id });
            }else {
                return res.status(404).json({ status: "error", msg: "ID does not exist", payload: {} });
            }
        } catch(e) {
            if(PORT == 8080){
                loggerDev.verbose(e);
            }
            return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
          });
        }
    };

    addProduct = async (req, res) => {
        try {
            const { title, description, code, price, stock, category, thumbnail } = req.body;
            if (!title || !description || !code || !price || !stock || !category) {
                return  CustomError.createError({
                    name: "TYPE ERROR",
                    cause: "Someone field/s incomplete",
                    message: "Please complete all fields",
                    code: EErrors.EMPTY_FIELDS_ERROR,
                });
            }
            const productCreated = await productsService.addProduct({
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            });
            return res.status(201).json({ status: "success", msg: "added product", payload: {
                _id: productCreated._id,
                title: productCreated.title,
                description: productCreated.description,
                code: productCreated.code,
                price: productCreated.price,
                stock: productCreated.stock,
                category: productCreated.category,
                thumbnail: productCreated.thumbnail,
            } 
            });
        } catch(e) {
            return res.status(500).json({
                status: "Error",
                error: e.name,
                cause: e.cause,
            });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const { _pid } = req.params;
            const { title, description, code, price, stock, category, thumbnail } = req.body;
            if (!title || !description || !code || !price || !stock || !category && PORT == 3000) {
                loggerProd.error(new Date().toLocaleTimeString() +
                new Date().getUTCMilliseconds() + " Not updated product, priority to fix!!");
                return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });
            }       
            const prodUpdated = await productsService.updateProduct({
                _pid,
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            });
            return res.status(200).json({ status: "success", msg: "product updated", payload: prodUpdated });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const { _pid } = req.params;
            const resultdelete = await productsService.deleteProduct(_pid);
            if (resultdelete) {
                return res.status(200).json({ status: "success", msg: "product deleted", payload: {} });
            } else {
                return res.status(404).json({ status: "error", msg: "product not found", payload: {} });
            }
        } catch(e) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

}

export const productsController = new ProductsController();