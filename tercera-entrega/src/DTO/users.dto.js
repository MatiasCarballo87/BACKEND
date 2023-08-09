export default class UsersDTO {
    constructor(user) {
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.age = user.age,
        this.email = user.email,
        this.password = user.password,
        this.cartId = user.cartId,
        this.role = user.role
    }
}