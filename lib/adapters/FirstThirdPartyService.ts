import { injectable } from 'inversify';
import { TicketThirdPartyService } from '../core/schemas/TicketThirdPartyService';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class FirstThirdPartyService implements TicketThirdPartyService {
    updateTicketIssueCount(data: {
        reference: string;
        issueCount: number;
    }): string {
        return data.reference;
    }
    createTicket(data: { problemId: string; owner: string }): string {
        const reference = uuidv4();

        console.log({
            problemId: data.problemId,
            status: 'running',
            ExternalOwner: data.owner,
        });

        return reference;
    }
}
