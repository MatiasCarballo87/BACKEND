//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { productsRouter } from "./routes/products.router.js";
import { views } from "./routes/views.router.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import ProductManager from './class/ProductManager.js';
export const prodMan = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket)=> {
    const allProd = prodMan.getProducts();
    socket.emit("allProducts", allProd);
    socket.on("addProd", (formData) => {
        prodMan.addProduct(formData);
    });
    socket.on("delProd", (idProd) => {
        prodMan.deleteProduct(idProd);
    });
});

app.use('/api/products', productsRouter);
app.use('/', views);

app.get("*", (req, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not finded", data: {} });
});