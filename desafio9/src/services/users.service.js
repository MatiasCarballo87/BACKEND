import { usersModel } from "../dao/models/users.model.js";

class UsersService {

    async read() {
        const users = await usersModel.read();
        return users;
    };

    async create(firstName, lastName, age, email, password) {
        const userCreated = await usersModel.create(
            firstName, lastName, age, email, password
        );
        return userCreated;
    }

    async update(_uid) {
        const userUpdated = await usersModel.update(_uid);
        return userUpdated;
    };

    async delete(_uid) {
        const userDelete = await usersModel.delete(_uid);
        return userDelete;
    };
}

export const usersService = new UsersService();