import { TicketRepository } from '../core/repositories/TicketRepository';
import { Ticket, TicketAppType } from '../core/schemas/entities';
import { v4 as uuidv4 } from 'uuid';
import { MemoryDbConnection } from './database';

export class InMemoryTicketRepository implements TicketRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {}

    getByProblemAndApp(problemId: string, app: TicketAppType): Ticket | null {
        let ticketFound = null;
        for (let [key, value] of this.inMemoryDb.tickets) {
            if (value.app === app && value.problemId === problemId) {
                ticketFound = value;
                break;
            }
        }

        return ticketFound;
    }

    saveOne(data: Ticket): Ticket {
        const reference = uuidv4();

        const ticket = new Ticket({
            ...data,
            id: reference,
        });

        this.inMemoryDb.tickets.set(reference, ticket);

        return ticket;
    }
}
