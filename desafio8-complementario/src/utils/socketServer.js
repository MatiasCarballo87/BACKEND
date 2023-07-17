import { Server } from "socket.io";
import { MessagesModel } from "../dao/models/messages.model.js";
import { productsService } from "../services/products.services.js";

export function connectSocketServer(httpServer) {
    const socketServer = new Server(httpServer);
  
    socketServer.on("connection", (socket) => {
      socket.on("msg_front_to_back", async (msg) => {
        try {
          await MessagesModel.create(msg);
        } catch (e) {
          console.log(e);
        }
  
        try {
          const msgs = await MessagesModel.find({});
          socketServer.emit("list_of_msgs", msgs);
        } catch (e) {
          console.log(e);
        }
      });
    });

    socketServer.on("connection", async (socket)=> {
        const allProd = await productsService.getAllProducts();
        socket.emit("allProducts", allProd);
        socket.on("addProd", (formData) => {
          productsService.addProduct(formData);
        });
        socket.on("delProd", async (id) => {
          await productsService.deleteProduct(id);
        });
    });
};