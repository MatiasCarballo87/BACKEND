const express = require('express');
const app = express();
const PORT = 8080;
const ProductManager = require('./ProductManager');
const prodMan = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const allProd = prodMan.getProducts();
        console.log(allProd);
        const cantProd = allProd.slice(0, limit);
        res.json(cantProd);
    }else{
        const allProd = prodMan.getProducts();
        res.json(allProd);
    }
});

app.get('/products/:pid', (req, res) => {
    const id = req.params.pid;
    const prodId = prodMan.getProductById(id);
    if (prodId) {
        res.json(prodId);
    }else {
        res.json({ Error: 'ID does not exist'});
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});