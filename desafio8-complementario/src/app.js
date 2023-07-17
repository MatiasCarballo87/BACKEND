import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { __dirname } from "./config.js";
import { cartsRouter } from "./routes/carts.router.js";
import { chatRouter } from "./routes/chat.router.js";
import { loginRouter } from "./routes/login.router.js";
import { logoutRouter } from "./routes/logout.router.js";
import { productsRouter } from "./routes/products.router.js";
import { productsDBRouter } from "./routes/productsDB.router.js";
import { realTimeProductsRouter } from "./routes/realtimeproducts.router.js";
import { registerRouter } from "./routes/register.router.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";
import { iniPassport } from "./utils/passport.config.js";

const app = express();
const PORT = 8080;

app.use(session({
    store: MongoStore.create({
        mongoUrl:
        "mongodb+srv://carballomatiasr:gYtAvXS005bfvCk5@backend-coder.mjuwrcf.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 50000 * 8,
    }),
    secret: "kjghfBTC354MKnjbn",
    resave: true,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/login`);
});

connectSocketServer(httpServer);
connectMongo();

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/realtimeproducts', realTimeProductsRouter);
app.use('/chat', chatRouter);
app.use('/products', productsDBRouter);
app.use('/api/sessions/github', passport.authenticate("github", { scope: ["user: email"]}));
app.use('/api/sessions/githubcallback', passport.authenticate("github", { failureRedirect: "/register" }),
(req, res) => {
    req.session.firstName = req.user.firstName;
    req.session.email = req.user.email;
    req.session.role = req.user.role;
    res.redirect("/products");
});
app.get('/api/session/current', (req, res) => {
    return res.status(200).json({
        status: "Success",
        msg: "Session data user", 
        payload: { user: req.session.user }
    });
});

app.get("*", (_, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not finded", payload: {} });
});