import { Schema, model } from "mongoose";

export const ProductsModel = model(
    "products",
    new Schema({
        title: { type: String, required: true, max: 100 },
        description: { type: String, required: true, max: 100 },
        code: { type: String, required: true, max: 100 },
        price: { type: Number, required: true, max: 100000 },
        stock: { type: Number, required: true, max: 1000 },
        category: { type: String, required: true, max: 100 },
        thumbnail: { type: String, required: true, max: 100 },
    })
);