import { Schema, model, mongoose } from "mongoose";

export const CartsModel = model(
    "carts",
    new Schema({
        products: { 
            type: [ 
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                },
            ], 
            default:[]
        },
        quantity: { type: Number, required: true},
    })
);