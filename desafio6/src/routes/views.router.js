import express from 'express';
import { productsService } from '../services/products.services.js';
import { productsRenderService } from '../services/products.render.services.js';
export const views = express.Router();


views.get("/", async (_, res) => {
    try {
        const allProd = await productsService.getAllProducts();
        return res.status(200).render("home.handlebars", {allProd});
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
});

views.get("/realtimeproducts", (_, res) => {
    return res.status(200).render("realTimeProducts.handlebars");
});

views.get("/chat", (_, res) => {
    return res.status(200).render("chat.handlebars");
});

views.get("/products", async (req, res) => {
    try {
        const  { limit, pages, category, orderBy }  = req.query;
        const productsPage = await productsRenderService.getAllProductsRender(limit, pages, category, orderBy);
        const { totalPages, totalDocs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = productsPage;
        const productsRender = productsPage.docs.map((doc) => doc.toObject());
        return res.status(200).render("products.handlebars", { 
            productsRender,
            totalPages,
            totalDocs,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
    });
}});

