import express from "express";
import passport from "passport";
export const authRouter = express.Router();

authRouter.get("/register",  (_, res) => {
    return res.render("register.handlebars");
});

authRouter.post("/register", 
    passport.authenticate("register", { failureRedirect: "/auth/failregister" }), (req, res) => {
    if(!req.user ) {
        return res.status(400).json({ status: "error", msg: "incorrect data", payload: {} });        
    }
    req.session.user = {
        firstName: req.user.firstName,
        email: req.user.email,
        role: req.user.role,
    }
    return res.status(201).render("registerok.handlebars");
});

authRouter.get('/failregister', async (req, res) => {
    return res.status(500).json({ error: 'Failed register' });
});

authRouter.get("/login",  (_, res) => {
    return res.render("login.handlebars");
});

authRouter.post("/login", passport.authenticate("login", { failureRedirect: "/auth/faillogin" }), (req, res) => {
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

authRouter.get('/faillogin', async (req, res) => {
    return res.status(500).json({ error: 'Failed login' });
});

authRouter.get('/', (req, res) => {
    req.session.destroy(err => {
      if (err) {
          return res.status(400).json({ status: "error", msg: "failure logout", payload: {} }); 
      }
      return res.redirect('/auth/login');
    });
});