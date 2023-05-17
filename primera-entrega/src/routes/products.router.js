import express from "express";
import ProductManager from '../class/ProductManager.js';
const prodMan = new ProductManager();
export const productsRouter = express.Router();


productsRouter.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const allProd = prodMan.getProducts();
        const cantProd = allProd.slice(0, limit);
        return res.status(200).json({ status: "success", msg: "limit products", data: cantProd });
    }else{
        const allProd = prodMan.getProducts();
        return res.status(200).json({ status: "success", msg: "all products", data: allProd });
    }
});

productsRouter.get('/:pid', (req, res) => {
    const id = req.params.pid;
    const prodId = prodMan.getProductById(id);
    if (prodId) {
        return res.status(200).json({ status: "success", msg: "ID product finded", data: prodId });
    }else {
        return res.status(404).json({ Error: 'ID does not exist'});
    }
});

productsRouter.post('/', (req, res) => {
    const prod = req.body;
    const prodAdd = prodMan.addProduct(prod);
    return res.status(201).json({ status: "success", msg: "added product", data: prodAdd });
});

productsRouter.put('/:pid', (req, res) => {
    const id = req.params.pid;
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    const modifiedProd = prodMan.updateProduct(id, title, description, code, price, stock, category, thumbnail );
    if (modifiedProd) {
        return res.status(201).json({ status: "success", msg: "modified product", data: modifiedProd });
    }else {
        return res.status(404).json({ Error: 'product not modified'});
    }
});

productsRouter.delete('/:pid', (req, res) => {
    const id = req.params.pid;
    prodMan.deleteProduct(id);
    return res.status(200).json({ status: "success", msg: "removed product", data: {} });
});