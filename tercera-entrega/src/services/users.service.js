import { users } from "../DAO/mongo/users.mongo.js";
//import { users } from "../DAO/memory/users.memory.js";

class UsersService {

    async read() {
        const allUsers = await users.read();
        return allUsers;
    };

    async create(firstName, lastName, age, email, password) {
        const userCreated = await users.create(
            firstName, lastName, age, email, password
        );
        return userCreated;
    }

    async update(_uid, firstName, lastName, age, email, password) {
        const userUpdated = await users.update(_uid, firstName, lastName, age, email, password);
        return userUpdated;
    };

    async delete() {
        const userDelete = await users.delete();
        return userDelete;
    };
}

export const usersService = new UsersService();