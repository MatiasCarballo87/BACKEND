import { usersService } from "../services/users.service.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js";
import { loggerDev, loggerProd } from "../utils/logger.js";
import env from "../config.env.js";

const PORT = env.port;

class UsersController {

    read = async (_, res) => {
        try {
            const users = await usersService.read();
            return res.status(200).json({ status: "success", msg: "All Users", payload: users });
        } catch(e) {
            if(PORT == 8080){
                loggerDev.debug("Users cannot be displayed"+ e);
            }
            return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            payload: {},
        });
    }};

    create = async (req, res) => {
        try {
            const {firstName, lastName, age, email, password } = req.body;
            if (!firstName || !lastName || !age || !email || !password ) {
                return  CustomError.createError({
                    name: "TYPE ERROR",
                    cause: "Someone field/s incomplete",
                    message: "Please complete all fields",
                    code: EErrors.EMPTY_FIELDS_ERROR,
                });
            }
            const userCreated = await usersService.create({
                firstName,
                lastName,
                age,
                email,
                password,});
            if(PORT == 3000){
                loggerProd.info(new Date().toLocaleTimeString() +
                new Date().getUTCMilliseconds() + " New user created");
            };
            return res.status(201).json({ status: "success", msg: "user created", payload: {
                _id: userCreated._id,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                age: userCreated.age,
                email: userCreated.email,
                password: userCreated.password,
            } 
            });
        } catch(e) {
            return res.status(500).json({
            status: "Error",
            error: e.name,
            cause: e.cause,
            });
        }
    };

    update = async (req, res) => {
        try {
            const { _uid } = req.params;
            const {firstName, lastName, age, email, password } = req.body;
            if (!firstName || !lastName || !age || !email || !password && PORT == 3000) {
                loggerProd.error(new Date().toLocaleTimeString() +
                new Date().getUTCMilliseconds() + " User cannot be updated");
                return res.status(400).json({ status: "error", msg: "please complete all camps required", payload: {} });
            }
            const userUpdated = await usersService.update({
                _uid,
                firstName,
                lastName,
                age,
                email,
                password,
            });
            return res.status(200).json({ status: "success", msg: "user updated", payload: userUpdated });
        } catch (e) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };

    delete = async (req, res) => {
        try {
            const { _uid } = req.params;
            const deleteUser = await usersService.delete(_uid);
            if (!deleteUser && PORT == 3000) {
                loggerProd.error(new Date().toLocaleTimeString() +
                new Date().getUTCMilliseconds() + " User cannot be deleted");
                return res.status(404).json({ status: "error", msg: "product not found", payload: {} });
            } else {
                return res.status(200).json({ status: "success", msg: "product deleted", payload: {} });
            }
        } catch(e) {
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                payload: {},
            });
        }
    };
}

export const usersController = new UsersController();