import express from "express";
import passport from "passport";
export const registerRouter = express.Router();

registerRouter.get("/",  (_, res) => {
    return res.render("register.handlebars");
});

registerRouter.post("/", passport.authenticate("register", { failureRedirect: "/register/failregister" }), (req, res) => {
    if(!req.user ) {
        return res.status(400).json({ status: "error", msg: "incorrect data", payload: {} });        
    }
    req.session.user = {
        firstName: req.user.firstName,
        email: req.user.email,
        admin: req.user.admin,
    }
    return res.status(201).render("registerok.handlebars");
});

registerRouter.get('/failregister', async (req, res) => {
    return res.status(500).json({ error: 'Failed register' });
});