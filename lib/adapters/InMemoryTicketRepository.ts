import { TicketRepository } from '../core/repositories/TicketRepository';
import { Ticket } from '../core/schemas/entities';
import { v4 as uuidv4 } from 'uuid';
import { MemoryDbConnection } from './database';

export class InMemoryTicketRepository implements TicketRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {}

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
