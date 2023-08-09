import { Server } from "socket.io";
import { MessagesMongoose } from "../DAO/mongo/models/messages.mongoose.js";
import { productsService } from "../services/products.service.js";

export function connectSocketServer(httpServer) {
    const socketServer = new Server(httpServer);
  
    socketServer.on("connection", (socket) => {
      socket.on("msg_front_to_back", async (msg) => {
        try {
          await MessagesMongoose.create(msg);
        } catch (e) {
          console.log(e);
        }
  
        try {
          const msgs = await MessagesMongoose.find({});
          socketServer.emit("list_of_msgs", msgs);
        } catch (e) {
          console.log(e);
        }
      });
    });

    socketServer.on("connection", async (socket)=> {
        const allProd = await productsService.getAll();
        socket.emit("allProducts", allProd);
        socket.on("addProd", (formData) => {
          productsService.addProduct(formData);
        });
        socket.on("delProd", async (id) => {
          await productsService.deleteProduct(id);
        });
    });
};