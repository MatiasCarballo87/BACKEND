import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

loginRouter.get("/",  (_, res) => {
    return res.render("login.handlebars");
});

loginRouter.post("/", passport.authenticate("login", { failureRedirect: "/login/faillogin" }), (req, res) => {
    if(!req.user) {
        return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });        
    }
    req.session.user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        email: req.user.email,
        role: req.user.role,
    }
    return res.status(201).redirect("/products");
});

loginRouter.get('/faillogin', async (req, res) => {
    return res.status(500).json({ error: 'Failed login' });
});