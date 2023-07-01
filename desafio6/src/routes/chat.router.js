import express from "express";
import { isUser } from "../middlewares/auth.js";
export const chatRouter = express.Router();

chatRouter.get("/", isUser, (_, res) => {
    return res.status(200).render("chat.handlebars");
});