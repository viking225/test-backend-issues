import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { UseCase } from '../schemas/UseCase';
import { ProblemStatus, Ticket, TicketAppType } from '../schemas/entities';
import { APP_IDENTIFIERS } from '../constants/symbol';
import { ProblemRepository } from '../repositories/ProblemRepository';
import { TicketRepository } from '../repositories/TicketRepository';
import {
    ProblemInvalidStatusError,
    ProblemNotFoundError,
    TicketThridPartyTypeError,
} from '../schemas/errors';
import { TicketThirdPartyService } from '../schemas/TicketThirdPartyService';

export type CreateTicketOnThirdPartyCommand = {
    type: TicketAppType;
    problemId: string;
};
@injectable()
export class CreateTicketOnThirdParty extends UseCase<
    CreateTicketOnThirdPartyCommand,
    Ticket
> {
    constructor(
        @inject(APP_IDENTIFIERS.ProblemRepository)
        private readonly problemRepo: ProblemRepository,
        @inject(APP_IDENTIFIERS.TicketRepo)
        private readonly ticketRepo: TicketRepository,
        @inject(APP_IDENTIFIERS.ThirdParty1)
        private readonly firstParty: TicketThirdPartyService,
        @inject(APP_IDENTIFIERS.ThidParty2)
        private readonly secondParty: TicketThirdPartyService
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

        if (problem.status !== ProblemStatus.ready) {
            throw new ProblemInvalidStatusError();
        }

        const ticketToSave = new Ticket({
            app: this.command.type,
            problemId: problem.id,
        });
        const ticketParameter = { problemId: problem.id, owner: 'csTeam' };

        if (this.command.type === 'ThirdPartyApp1') {
            ticketToSave.reference =
                this.firstParty.createTicket(ticketParameter);
        } else {
            ticketToSave.reference =
                this.secondParty.createTicket(ticketParameter);
        }

        return this.ticketRepo.saveOne(ticketToSave);
    }
}
