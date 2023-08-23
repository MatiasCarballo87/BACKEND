import { tickets } from "../DAO/mongo/tickets.mongo.js";

class TicketsService {

    async createTicket(ticket) {
        const newTicket = await tickets.createTicket(ticket);
        return newTicket;
    }
};

export const ticketsService = new TicketsService();

