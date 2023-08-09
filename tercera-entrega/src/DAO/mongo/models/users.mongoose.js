import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const usersMongoose = model(
  'users',
  new Schema({
    firstName: {
      type: String,
      required: true,
      max: 100,
    },
    lastName: {
      type: String,
      required: true,
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
      required: false,
    },
    password: {
      type: String,
      max: 100,
    },
    cartId: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  }).plugin(mongoosePaginate)
);