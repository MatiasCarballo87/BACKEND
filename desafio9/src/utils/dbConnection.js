import { connect } from "mongoose";
import env from "../config.env.js";

export async function connectMongo() {
    try {
        await connect(env.mongoUrl);        ;
        console.log("success mongo");
    } catch (e) {
        console.log(e);
        throw "can not conncet to the db";
    }
};