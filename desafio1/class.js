class ProductManager {
    constructor() {
        this.products = [];
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let idProd = 0;
        this.products.forEach((prod) => {
            if(prod.id > idProd){
                idProd = prod.id;
            }
        });
        idProd++;
        const product = {
            id: idProd,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        let codeEqual = this.products.find(e => e.code === product.code)
        if(codeEqual){
            console.log("Error: repeated code")
        }else{
            this.products.push(product);
        }
        
        
    }

    getProductById(id) {
        const allProducts = this.getProducts();
        const prodFinded = allProducts.find((prod) => prod.id == id);
        if (prodFinded) {
            return prodFinded;
        }else{
            console.log("Not Found");
        }
    }
}

const prodM = new ProductManager();

prodM.addProduct("camiseta", "camiseta de futbol", 2500, "foto camiseta", 350, 10);
prodM.addProduct("pelota", "pelota de futbol", 1500, "foto pelota", 200, 5);
prodM.addProduct("media", "media de futbol", 500, "foto media", 100, 15);
prodM.addProduct("short", "short de futbol", 1000, "foto short", 800, 8);


console.log(prodM.getProducts());
/* console.log(prodM.getProductById(5)); */