import  express  from "express";
export const realTimeProductsRouter = express.Router();

realTimeProductsRouter.get("/", (_, res) => {
    return res.status(200).render("realTimeProducts.handlebars");
});