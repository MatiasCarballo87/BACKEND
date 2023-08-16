import express from "express";
import { createFakerProd } from "../public/mocking-products.js";
export const mockingRouter = express.Router();

mockingRouter.get("/", (_, res) => {
    const fakeProds = [];
    for (let i = 0; i < 100; i++) {
        fakeProds.push(createFakerProd()); 
    }
    return res.status(200).send({ status: "success", payload: fakeProds });
});