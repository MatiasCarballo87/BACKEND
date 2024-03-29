import { Schema, model } from "mongoose";

export const ticketsMongoose = model(
    'tickets',
    new Schema({
        code: { type: String, required: true, unique: true },
        purchase_datetime: { type: String, required: true },
        amount: { type: Number, required: true },
        purchaser: { type: String, required: true },
    })
);