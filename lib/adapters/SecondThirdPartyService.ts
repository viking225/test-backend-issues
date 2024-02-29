import { injectable } from 'inversify';
import { TicketThirdPartyService } from '../core/schemas/TicketThirdPartyService';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class SecondThirdPartyService implements TicketThirdPartyService {
    updateTicketIssueCount(data: {
        reference: string;
        issueCount: number;
    }): string {
        return data.reference;
    }
    createTicket(data: { problemId: string; owner: string }): string {
        const reference = uuidv4();

        console.log({
            ProblemRef: data.problemId,
            status: 'ongoing',
            ExternalOwner: data.owner,
        });

        return reference;
    }
}
