import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import env from "./config.env.js";
import errorHandler from "./middlewares/error.js";
import { __dirname } from "./dirname.config.js";
import { authRouter } from "./routes/auth.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { cartsDBRouter } from "./routes/cartsDB.router.js";
import { chatRouter } from "./routes/chat.router.js";
import { mockingRouter } from "./routes/mocking.router.js";
import { productsRouter } from "./routes/products.router.js";
import { productsDBRouter } from "./routes/productsDB.router.js";
import { realTimeProductsRouter } from "./routes/realtimeproducts.router.js";
import { sessionsRouter } from "./routes/sessions.router.js";
import { usersRouter } from "./routes/users.router.js";
import { connectMongo } from "./utils/dbConnection.js";
import { iniPassport } from "./utils/passport.config.js";
import { connectSocketServer } from "./utils/socketServer.js";

const app = express();
const PORT = env.port;

app.use(session({
    store: MongoStore.create({
        mongoUrl: env.mongoUrl,
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
    console.log(`http://localhost:${PORT}/auth/login`);
});

connectSocketServer(httpServer);
connectMongo();

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//VIEWS
app.use('/auth', authRouter);
app.use('/realtimeproducts', realTimeProductsRouter);
app.use('/chat', chatRouter);
app.use('/products', productsDBRouter);
app.use('/carts', cartsDBRouter);

//ENDPOINTS
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mockingproducts', mockingRouter);
app.use(errorHandler);


//ROUTES NOT FOUND
app.get("*", (_, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not found", payload: {} });
});