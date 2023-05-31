import fs from 'fs';

class ProductManager {
    constructor() {
        this.filePath = "./db/products.json"
        this.products = this.getProducts();
    }
    
    getProducts() {
        const allProducts = fs.readFileSync(this.filePath);
        const allProdFind = JSON.parse(allProducts);
        return (allProdFind);
    };

    addProduct(product) {
        const id = 
            this.products.length === 0
                ? 1
                : this.products[this.products.length - 1].id + 1;
            product.id = id;
        let codeEqual = this.products.find(e => e.code === product.code)
        if(!codeEqual){
            this.products.push(product);
            fs.writeFileSync(
                    this.filePath, 
                    JSON.stringify(this.products, null));
        } else {
            console.log("Error: repeated code")
        }
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
        const idProd = this.getProducts();
        const item = idProd.filter((prod) => parseInt(prod.id) !== parseInt(id));
        fs.writeFileSync(this.filePath, JSON.stringify(item, null));
    }
}

const prodMan = new ProductManager();

export default ProductManager;
