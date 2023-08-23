import fs from "fs";

class ProductManager {
    constructor() {
        this.filePath = "./src/utils/products.json";
        this.products = [];
    }
    
    getProducts() {
        const allProducts = fs.readFileSync(this.filePath);
        const allProdFind = JSON.parse(allProducts);
        return (allProdFind);
    };

    addProduct(product) {
        const allProducts = fs.readFileSync(this.filePath);
        const allProdFind = JSON.parse(allProducts);
        const id = 
            allProdFind.length === 0
                ? 1
                : allProdFind[allProdFind.length - 1].id + 1;
            product.id = id;
            allProdFind.push({...product, status: true});
            fs.writeFileSync(
                this.filePath, 
                JSON.stringify(allProdFind, null));
                return product;
    };

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

    updateProduct(id, title, description, code, price, status, stock, category, thumbnail) {
        const idProd = fs.readFileSync(this.filePath);
        const prodFind = JSON.parse(idProd);
        const item = prodFind.find((prod) => prod.id == id);
        if (item) {
            item.title = title;
            item.description = description;
            item.code = code;
            item.price = price;
            item.status = status;
            item.stock = stock;
            item.category = category;
            item.thumbnail = thumbnail;
            fs.writeFileSync(this.filePath, JSON.stringify(prodFind, null));
            return item;
        }else {
            return console.log("Error: ID doesn't exist");
        }
    }

    deleteProduct(id) {
        const idProd = fs.readFileSync(this.filePath);
        const prodFind = JSON.parse(idProd);
        const item = prodFind.filter((prod) => prod.id != id);
        fs.writeFileSync(this.filePath, JSON.stringify(item, null));
    }
}

const prodMan = new ProductManager();

//console.log(prodMan.getProducts());

export default ProductManager;
