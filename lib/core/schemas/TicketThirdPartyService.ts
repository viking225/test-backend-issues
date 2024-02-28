type TicketCreateRequest = {
    problemId: string;
    owner: string;
};

export interface TicketThirdPartyService {
    createTicket(data: TicketCreateRequest): string;
}
