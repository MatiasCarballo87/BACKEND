import fs from "fs";

class CartManager {
    constructor() {
        this.filePath = "./src/utils/carts.json";
        this.carts = [];
    } 
     
    
    createCart() {
        const allCarts = fs.readFileSync(this.filePath);
        const allCartsFind = JSON.parse(allCarts);
        const id = 
        allCartsFind.length === 0
        ? 1 
        : allCartsFind[allCartsFind.length - 1].id + 1;
        allCartsFind.push({ products:[], id: id });
        fs.writeFileSync(
            this.filePath, 
            JSON.stringify(allCartsFind, null)); 
    };
            
    getCartById(id) {
        const allCarts = fs.readFileSync(this.filePath);
        const cartObj = JSON.parse(allCarts);
        const cartFinded = cartObj.find((cart) => cart.id === id);
        if (cartFinded) {
            return cartFinded;
        }else{  
            console.log("Not Found");
        }
    };

    addProductToCartById(cartId, prodId, quantity) {
        const allCarts = fs.readFileSync(this.filePath);
        const carts = JSON.parse(allCarts);
        const cartFinded = carts.find((cart) => cart.id == cartId);
        if(!cartFinded) {
            console.log("idCart not found");
        }
        const existingProduct = cartFinded.products.find(prod => prod.id == prodId);
        if(!existingProduct) {
            cartFinded.products.push({ id: prodId, quantity});
        } else {
            existingProduct.quantity += quantity;
            console.log(existingProduct)
        }
        fs.writeFileSync(
            this.filePath, 
            JSON.stringify(carts, null));
        return cartFinded; 
    };
}


export default CartManager;
