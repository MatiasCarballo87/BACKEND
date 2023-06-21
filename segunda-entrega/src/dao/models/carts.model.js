import { Schema, model, mongoose } from "mongoose";
const cartsCollection = "carts";

const cartsSchema = (
    new Schema({
        products: { 
            type: [ 
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                        required: true
                    },
                    quantity: { type: Number},
                },
            ], 
            default:[]
        },
    })
);

const cartsModel = model(cartsCollection, cartsSchema);

export default cartsModel;