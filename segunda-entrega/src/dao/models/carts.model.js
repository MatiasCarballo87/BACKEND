//@ts-check
import { Schema, model } from "mongoose";
/* const cartsCollection = "carts"; */

const cartsSchema = (
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

/* const cartsModel = model(cartsCollection, cartsSchema); */
const cartsModel = model("carts", cartsSchema);

export default cartsModel;