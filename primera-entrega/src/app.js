import express from "express";
const app = express();
const PORT = 8080;
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get("*", (req, res) => {
    return res
        .status(404)
        .json({ status: "Error", msg: "Rute not finded", data: {} });
});