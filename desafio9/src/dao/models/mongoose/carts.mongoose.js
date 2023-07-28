import { Schema, model } from "mongoose";

export const cartsMongoose = model(
    'carts',
    new Schema({
        products: { 
            type: [ 
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "products",
                        required: true,
                    },
                    quantity: { type: Number, default: 1},
                },
            ], 
            default:[],
        },
    })
);

