import express from "express";
import { productsService } from "../services/products.services.js";
export const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await productsService.getProducts(queryParams);
        return res.status(200).json({ status: "success", msg: "All Products", payload: response }); 
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
});

productsRouter.get('/:_pid', async (req, res) => {
    try {
        const { _pid } = req.params;
        const prod_Id = await productsService.getProductById(_pid);
        if (prod_Id) {
            return res.status(200).json({ status: "success", msg: "ID product finded", payload: prod_Id });
        }else {
            return res.status(404).json({ status: "error", msg: "ID does not exist", payload: {} });
        }
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });
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
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});
    
productsRouter.put('/:_pid', async (req, res) => {
    try {
        const { _pid } = req.params;
        const { title, description, code, price, stock, category, thumbnail } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });
        }       
        try {
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
            if (prodUpdated) {
                return res.status(200).json({ status: "success", msg: "product updated", payload: {} });
            } else {
                return res.status(404).json({ status: "error", msg: 'product not found', payload: {} });
            }
        } catch (e) {
            return res.status(500).json({
              status: "error",
              msg: "db server error while updating user",
              payload: {},
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});

productsRouter.delete('/:_pid', async (req, res) => {
    try {
        const { _pid } = req.params;
        const resultdelete = await productsService.deleteProduct(_pid);
        if (resultdelete) {
            return res.status(200).json({ status: "success", msg: "product deleted", payload: {} });
        } else {
            return res.status(404).json({ status: "error", msg: "product not found", payload: {} });
        }
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});