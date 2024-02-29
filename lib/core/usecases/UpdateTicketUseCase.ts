import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { UseCase } from '../schemas/UseCase';
import { ProblemStatus, Ticket, TicketAppType } from '../schemas/entities';
import { APP_IDENTIFIERS } from '../constants/symbol';
import { ProblemRepository } from '../repositories/ProblemRepository';
import { TicketThirdPartyService } from '../schemas/TicketThirdPartyService';
import {
    ProblemInvalidStatusError,
    ProblemNotFoundError,
    TicketThridPartyTypeError,
} from '../schemas/errors';
import { TicketRepository } from '../repositories/TicketRepository';
import { IssueRepository } from '../repositories/IssueRepository';

export type UpdateTicketUseCaseCommand = {
    type: TicketAppType;
    problemId: string;
};

@injectable()
export class UpdateTicketUseCase extends UseCase<
    UpdateTicketUseCaseCommand,
    Ticket
> {
    constructor(
        @inject(APP_IDENTIFIERS.IssueRepository)
        private readonly issueRepo: IssueRepository,
        @inject(APP_IDENTIFIERS.TicketRepo)
        private readonly ticketRepo: TicketRepository,
        @inject(APP_IDENTIFIERS.ProblemRepository)
        private readonly problemRepo: ProblemRepository,
        @inject(APP_IDENTIFIERS.ThirdParty1)
        private readonly firstThirdParty: TicketThirdPartyService,
        @inject(APP_IDENTIFIERS.ThidParty2)
        private readonly secondThirdParty: TicketThirdPartyService
    ) {
        super();
    }
    execute(): Ticket | Promise<Ticket> {
        if (
            this.command.type !== 'ThirdPartyApp1' &&
            this.command.type !== 'ThirdPartyApp2'
        ) {
            throw new TicketThridPartyTypeError();
        }

        const problem = this.problemRepo.get(this.command.problemId);

        if (!problem) {
            throw new ProblemNotFoundError();
        }

        if (problem.status !== ProblemStatus.open) {
            throw new ProblemInvalidStatusError();
        }

        const issues = this.issueRepo.getByProblemId(problem.id);
        const ticket = this.ticketRepo.getByProblemAndApp(
            problem.id,
            this.command.type
        );

        const thirdPartyParams = {
            reference: ticket.reference,
            issueCount: issues.length,
        };

        if (this.command.type === TicketAppType.ThirdPartyApp1) {
            this.firstThirdParty.updateTicketIssueCount(thirdPartyParams);
        } else {
            this.secondThirdParty.updateTicketIssueCount(thirdPartyParams);
        }

        return ticket
    }
}
