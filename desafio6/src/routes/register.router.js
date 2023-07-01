import express from "express";
import { userModel } from "../dao/models/user.model.js";
export const registerRouter = express.Router();

registerRouter.get("/",  (_, res) => {
    return res.render("register.handlebars");
});

registerRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, age, email, password } = req.body;
        if(!firstName || !lastName || !age || !email || !password ) {
            return res.status(400).json({ status: "error", msg: "incorrect data", payload: {} });        
        }
        await userModel.create({ firstName, lastName, age, email, password });
        req.session.firstName = firstName;
        req.session.email = email;
        return res.status(201).render('success-login');
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});