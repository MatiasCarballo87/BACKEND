const fs = require("fs");

class ManagerUsuarios {
    constructor(){
        this.users = [];
        const usersString = fs.writeFileSync("user.json", "utf-8");
        const users = JSON.parse(usersString);
        this.users = users;
    }

    createUser(user) {
        this.users.push(user);
        const usersString = JSON.stringify(this.users);
        fs.writeFileSync("users.json", usersString);
    }

    getAllUsers(){
        return this.users;
    }
}

const ManagerUsuarios = new ManagerUsuarios();