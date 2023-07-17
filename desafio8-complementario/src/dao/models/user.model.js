import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const userModel = model(
    'users',
    new Schema({
      firstName: {
        type: String,
        max: 100,
      },
      lastName: {
        type: String,
        max: 100,
      },
      email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
      },
      age: {
        type: Number,
      },
      password: {
        type: String,
        max: 100,
      },
      cart: {
        type: Array,
      },
      role: {
        type: String,
        default: "user",
      },
    }).plugin(mongoosePaginate)
  );