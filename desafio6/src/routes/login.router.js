import express from "express";
import { userModel } from "../dao/models/user.model.js";
export const loginRouter = express.Router();

loginRouter.get("/login",  (_, res) => {
    res.render("login");
});

loginRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });        
        }
        const logUser = await userModel.findOne({ email }).exec();
        if (logUser && logUser.password === password) {
        req.session.firstName = logUser.firstName;
        req.session.email = logUser.email;
        req.session.admin = logUser.admin;
        return res.redirect('/products');
        } else {
            return res.status(400).json({ status: "error", msg: "wrong email or password", payload: {} });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});