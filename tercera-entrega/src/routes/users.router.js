import express from "express";
import { usersController } from "../controllers/users.controller.js";
export const usersRouter = express.Router();

usersRouter.get("/", usersController.read);
usersRouter.post('/', usersController.create);
usersRouter.put('/:_uid', usersController.update);
usersRouter.delete('/:_uid', usersController.delete);