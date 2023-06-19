//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { views } from "./routes/views.router.js";
import { __dirname } from "./config.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { connectSocketServer } from "./utils/socketServer.js";
import { connectMongo } from "./utils/dbConnection.js";

const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

connectSocketServer(httpServer);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', views);

app.get("*", (_, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not finded", payload: {} });
});