const fs = require("fs");

class ProductManager {
    constructor() {
        this.filePath = "./products.json"
        this.products = [];
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(product) {
        const id = 
            this.products.length === 0
                ? 1
                : this.products[this.products.length - 1].id + 1;
        product.id = id;
        let codeEqual = this.products.find(e => e.code === product.code)
        if(codeEqual){
            console.log("Error: repeated code")
        }else{
            this.products.push(product);
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null));
        }
    }

    getProductById(id) {
        const allProducts = fs.readFileSync(this.filePath);
        const prodObj = JSON.parse(allProducts);
        const prodFinded = prodObj.find((prod) => prod.id == id);
        if (prodFinded) {
            return prodFinded;
        }else{
            console.log("Not Found");
        }
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {
        const idProd = fs.readFileSync(this.filePath);
        const prodFind = JSON.parse(idProd);
        const item = prodFind.find((prod) => prod.id == id);
        if (item) {
            item.title = title;
            item.description = description;
            item.price = price;
            item.thumbnail = thumbnail;
            item.code = code;
            item.stock = stock;
            fs.writeFileSync(this.filePath, JSON.stringify(prodFind, null));
            return item;
        }else {
            return console.log("Error: ID doesn't exist");
        }
    }

    deleteProduct(id) {
        const idProd = fs.readFileSync(this.filePath);
        const prodFind = JSON.parse(idProd);
        const item = prodFind.filter((prod) => prod.id !== id);
        console.log(item);
        fs.writeFileSync(this.filePath, JSON.stringify(item, null));
    }
}

const prodMan = new ProductManager();

prodMan.addProduct({title: "camiseta", description: "camiseta de futbol", price: 2500, thumbnail: "foto camiseta", code: 350, stock: 10});
prodMan.addProduct({title: "pelota", description: "pelota de futbol", price: 1500, thumbnail: "foto pelota", code: 200, stock: 5});
prodMan.addProduct({title: "media", description: "media de futbol", price: 500, thumbnail: "foto media", code: 100, stock: 15});
prodMan.addProduct({title: "short", description: "short de futbol", price: 1000, thumbnail: "foto short", code: 800, stock: 8});


// console.log(prodMan.updateProduct(3,"remera", "remera de futbol", 2100, "foto remera",370,7));

prodMan.deleteProduct(4);