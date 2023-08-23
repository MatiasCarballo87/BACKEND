import { usersMongoose } from "./models/users.mongoose.js";
import { createHash } from "../../utils/bcrypt.js";
import { cartsService } from "../../services/carts.service.js";
import UsersDTO from "../../DTO/users.dto.js";

class Users {

  async read() {
    const users = await usersMongoose.find({}).lean();
    return users;
  };

  async create({ firstName, lastName, age, email, password }) {
    const user = await usersMongoose.findOne({ email: email }).exec();
      if (user) {
        console.log('User already exists');
        return false;
      }
    const newUser = new UsersDTO({
      firstName, lastName, age, email, password: createHash(password), cartId: '',
    });
    const userCreated = await usersMongoose.create(newUser);
    const cart = await cartsService.createCart();
    userCreated.cartId = cart;
    await userCreated.save();
    return userCreated;
  };

  async update({ _uid, firstName, lastName, age, email, password }) {
    const userUpdated = await usersMongoose.updateOne(
        {
            _id : _uid,
        },
        { 
          firstName,
          lastName,
          age,
          email,
          password: createHash(password),
        }
    );
    return userUpdated;
  };

  async delete(_uid) {
    const user_Id = await usersMongoose.deleteOne({
        _id: _uid
    });
    return user_Id;
  };
}

export const users = new Users();