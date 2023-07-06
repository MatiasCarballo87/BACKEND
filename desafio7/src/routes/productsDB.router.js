import express from "express";
import { productsRenderService } from '../services/products.render.services.js';
import { isUser } from "../middlewares/auth.js";
export const productsDBRouter = express.Router();

productsDBRouter.get("/", isUser, async (req, res) => {
    try {
        const user = req.session.firstName;
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
            user,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
    });
}});