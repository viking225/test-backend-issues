import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { UseCase } from '../schemas/UseCase';
import { Problem, ProblemStatus } from '../schemas/entities';
import { APP_IDENTIFIERS } from '../constants/symbol';
import { ProblemRepository } from '../repositories/ProblemRepository';
import {
    ProblemInvalidStatusError,
    ProblemNotFoundError,
} from '../schemas/errors';
import { ProblemAvailableStatus } from '../constants/ProblemStatus';
import { IssueRepository } from '../repositories/IssueRepository';

export type UpdateProblemStatusCommand = {
    id: string;
    status: ProblemStatus;
};

@injectable()
export class UpdateProblemStatus extends UseCase<
    UpdateProblemStatusCommand,
    Problem
> {
    constructor(
        @inject(APP_IDENTIFIERS.ProblemRepository)
        private readonly problemRepo: ProblemRepository,
        @inject(APP_IDENTIFIERS.IssueRepository)
        private readonly issueRepo: IssueRepository
    ) {
        super();
    }

    execute(): Problem | Promise<Problem> {
        const problem = this.problemRepo.get(this.command.id);

        if (!problem) {
            throw new ProblemNotFoundError();
        }

        const issues = this.issueRepo.getByProblemId(problem.id);
        
        const updateStatusIndex = ProblemAvailableStatus.findIndex(
            (s) => s === this.command.status
        );

        if (
            updateStatusIndex < 0 ||
            updateStatusIndex <
                ProblemAvailableStatus.findIndex((s) => problem.status)
        ) {
            throw new ProblemInvalidStatusError();
        }

        problem.status = this.command.status;

        this.problemRepo.saveOne(problem);

        return problem;
    }
}
