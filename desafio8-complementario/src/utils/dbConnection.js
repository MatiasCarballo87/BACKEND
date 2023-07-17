import { connect } from "mongoose";

export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://carballomatiasr:gYtAvXS005bfvCk5@backend-coder.mjuwrcf.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("success mongo");
    } catch (e) {
        console.log(e);
        throw "can not conncet to the db";
    }
};