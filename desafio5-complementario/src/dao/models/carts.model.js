import { Schema, model } from "mongoose";

export const CartsModel = model(
    "carts",
    new Schema({
        products:
            [ 
                {
                    _pid: String,
                    quantity: Number,
                },
            ] 
        
    })
);