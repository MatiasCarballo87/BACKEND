import express from "express";
import passport from "passport";
export const sessionsRouter = express.Router();

sessionsRouter.get("/github",  passport.authenticate("github", { scope: ["user: email"]}));

sessionsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/register" }),
(req, res) => {
    req.session.firstName = req.user.firstName;
    req.session.email = req.user.email;
    req.session.role = req.user.role;
    res.redirect("/products");
});

sessionsRouter.get('/current', (req, res) => {
    return res.status(200).json({
        status: "Success",
        msg: "Session data user", 
        payload: { user: req.session.user }
    });
});