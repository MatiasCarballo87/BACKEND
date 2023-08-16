import { ticketsMongoose } from "./models/ticket.mongoose.js";

class Tickets {

    async createTicket() {
        const ticket = {
            code,
            purchase_datetime: new Date().toLocaleString(),
            amount,
            purchaser: req.user.email
        }
        const newTicket = await ticketsMongoose.create(ticket);
        return newTicket;
    }
};

export const tickets = new Tickets();