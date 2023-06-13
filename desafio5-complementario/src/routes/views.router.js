import express from 'express';
/* import ProductManager from '../class/ProductManager.js';
export const prodMan = new ProductManager(); */
export const views = express.Router();


views.get("/", (_, res) => {
    const allProd = prodMan.getProducts();
    return res.status(200).render("home.handlebars", {allProd, productsExist: true});
});

views.get("/realtimeproducts", (_, res) => {
    return res.status(200).render("realTimeProducts.handlebars");
});

views.get("/chat", (_, res) => {
    return res.status(200).render("chat.handlebars");
});
