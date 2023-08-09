import { v4 as uuidv4 } from 'uuid';
import { createHash } from "../../utils/bcrypt.js";

class Users {
    constructor() {
        this.users = [];
    }

    read() {
      const users = this.users;
      return users;
    };
  
    create({ firstName, lastName, age, email, password }) {
        const allUsers = this.users;
        const user = allUsers.find((u) => u._email == email);
            if (user) {
            console.log('User already exists');
            return false;
            }
        const newUser = {
            firstName, lastName, age, email, password: createHash(password), cartId: { products: [], id: uuidv4()},
        }
        const _id = uuidv4();
        newUser._id = _id;
        const userCreated = allUsers.push({...newUser});
        return userCreated;
    };
  
    update( {_uid, firstName, lastName, age, email, password }) {
        const allUsers = this.users;
        const user = allUsers.find((user) => user._id == _uid);
        if(!user) {
            console.log("user not exist");
            return false;
        }
        { 
            user.firstName = firstName;
            user.lastName = lastName;
            user.age = age;
            user.email = email;
            user.password = password;
        }
        return user;
    };
  
    delete(_uid) {
        const users = this.users;
        const userIndex = users.findIndex((user) => user._id == _uid);
        const userDelete = users.splice(userIndex, 1);
        return userDelete;
    };
  }
  
  export const users = new Users();