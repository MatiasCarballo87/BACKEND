import { ticketsMongoose } from "./models/ticket.mongoose.js";
import { v4 as uuidv4 } from 'uuid';

class Tickets {

    async createTicket() {
        const ticket = {
            code: uuidv4(),
            purchase_datetime: new Date().toLocaleString(),
            amount,
            purchaser: req.user.email
        }
        const newTicket = await ticketsMongoose.create(ticket);
        return newTicket;
    }
};

export const tickets = new Tickets();