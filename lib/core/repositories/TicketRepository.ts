import { Ticket } from '../schemas/entities';

export interface TicketRepository {
    saveOne(data: Ticket): Ticket;
}
