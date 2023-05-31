const socket = io();

let sendProducts = () => { 
    socket.on("allProducts", (products)=> {
    const allP = document.getElementById("allproducts");
    allP.innerHTML= "";
    products.map( (product) => {
        let element = document.createElement("div");
        allP.appendChild(element);
        element.innerHTML = `
            <table>
                <tbody>
                <tr>
                    <th>Name: </th>
                    <th>Description: </th>
                    <th>Price: </th>
                    <th>Thumbnail: </th>
                    <th>Code: </th>
                    <th>Stock: </th>
                    <th>Id: </th>
                </tr>
                <tr>
                    <td><strong>${product.title}</strong></td>
                    <td>${product.description}</td>
                    <td>$ ${product.price}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.code}</td>
                    <td>${product.stock}</td>
                    <td>${product.id}</td>
                </tr>
                </tbody>
            </table>    
        `
    });
}); 
};

sendProducts();

const formCreate = document.getElementById("formCreate");
formCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = formCreate.elements.title.value;
    const description = formCreate.elements.description.value;
    const price = formCreate.elements.price.value;
    const thumbnail = formCreate.elements.thumbnail.value;
    const code = formCreate.elements.code.value;
    const stock = formCreate.elements.stock.value;
    const formData = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
    }
    socket.emit('addProd', formData);
    formCreate.reset();
    /* sendProducts(); */
});

const formDelete = document.getElementById("formDelete");
formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = formDelete.elements.id.value;
    socket.emit('delProd', id);
    formDelete.reset();
    sendProducts();
});