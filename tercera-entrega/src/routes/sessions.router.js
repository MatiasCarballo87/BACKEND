import express from "express";
import passport from "passport";
import UsersDTO from "../DTO/users.dto.js";
export const sessionsRouter = express.Router();

sessionsRouter.get("/github",  passport.authenticate("github", { scope: ["user: email"]}));

sessionsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/register" }),
(req, res) => {
    try {
        req.session.firstName = req.user.firstName;
        req.session.email = req.user.email;
        req.session.role = req.user.role;
        res.redirect("/products");
    }catch {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});

sessionsRouter.get('/current', (req, res) => {
    return res.status(200).json({
        status: "Success",
        msg: "Session data user", 
        payload: { user: req.session.user }
    });
});