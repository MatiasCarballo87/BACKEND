//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection = "products";

const productsSchema = (
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
productsSchema.plugin(mongoosePaginate);

const productsModel = model(productsCollection,productsSchema);

export default productsModel;

