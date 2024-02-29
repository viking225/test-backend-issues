import { Ticket, TicketAppType } from '../schemas/entities';

export interface TicketRepository {
    saveOne(data: Ticket): Ticket;
    getByProblemAndApp(problemId: string, app: TicketAppType): Ticket;
}
