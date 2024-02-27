import { UseCase } from "../schemas/UseCase";
import { Problem, ProblemStatus } from "../schemas/entities";

export type UpdateProblemStatusCommand = {
    id: string;
    status: ProblemStatus
}

export class UpdateProblemStatus extends UseCase<UpdateProblemStatusCommand, Problem>{

    execute(): Problem | Promise<Problem> {
        throw new Error("Method not implemented.");
    }

}
