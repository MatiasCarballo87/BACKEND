import { Schema, model } from "mongoose";

export const MessagesMongoose = model(
  "messages",
  new Schema({
    message: { type: String, required: true, max: 100 },
    user: { type: String, required: true, max: 100 },
  })
);