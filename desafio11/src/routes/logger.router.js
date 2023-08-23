import express from "express";
import { readFile } from "fs/promises";
export const loggerRouter = express.Router();

loggerRouter.get('/', async (req, res) => {
    try{
        const file = "./errors.log";
        const render = await readFile( file, "utf8" );
        const renderOk = render.split("\n").filter(line => line.trim() !== "");
        return res.status(200).json({ status: "success", msg: "loggers", payload: renderOk });
    }catch(e){
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }
});