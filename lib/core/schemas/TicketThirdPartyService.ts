import { Ticket } from './entities';

type TicketCreateRequest = {
    problemId: string;
    owner: string;
};

export interface TicketThirdPartyService {
    createTicket(data: TicketCreateRequest): string;
    updateTicketIssueCount(data: {
        reference: string;
        issueCount: number;
    }): string;
}
