import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./config.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { loginRouter } from "./routes/login.router.js";
import { registerRouter } from "./routes/register.router.js";
import { logoutRouter } from "./routes/logout.router.js";
import { realTimeProductsRouter } from "./routes/realtimeproducts.router.js";
import { chatRouter } from "./routes/chat.router.js";
import { productsDBRouter } from "./routes/productsDB.router.js";
import { connectSocketServer } from "./utils/socketServer.js";
import { connectMongo } from "./utils/dbConnection.js";

const app = express();
const PORT = 8080;

connectMongo();

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

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/realtimeproducts', realTimeProductsRouter);
app.use('/chat', chatRouter);
app.use('/products', productsDBRouter);

app.get('/session', (req, res) => {
    if (req.session.cont) {
      req.session.cont++;
      res.send('nos visitaste ' + req.session.cont);
    } else {
      req.session.cont = 1;
      res.send('nos visitaste ' + 1);
    }
});

app.get("*", (_, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not finded", payload: {} });
});