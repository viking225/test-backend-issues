import { Problem, ProblemStatus } from "../schemas/entities";
import { ProblemInvalidStatusError, ProblemNotFoundError } from "../schemas/errors";
import { UpdateProblemStatus, UpdateProblemStatusCommand } from "./UpdateProblemStatus";

describe('UpdateProblemStatus', () => {
    let sut: ReturnType<typeof createSut>;

    beforeEach(() => {
        sut  = createSut();
    });

    it('Should throw an error if problem does not exist', () => {
        sut.whenCommandIs({
            status: ProblemStatus.closed,
            id: '1'
        });

        sut.whenProblemIsFound(null);

        sut.thenShouldThrowProblemNotFoundException();
    });

    function createSut() {
        const getOneProblemRepo = jest.fn();
        const problemRepo = {
            get: getOneProblemRepo
        };
        const uc = new UpdateProblemStatus();
        
        function whenCommandIs(command: UpdateProblemStatusCommand) {
            uc.with(command);
        }

        function whenProblemIsFound(problem: Problem | null) {
            getOneProblemRepo.mockResolvedValueOnce(() => problem);
        }

        function thenShouldThrowInvalidStatusException() {
            expect(uc.execute()).toThrow(ProblemInvalidStatusError);
        }

        function thenShouldThrowProblemNotFoundException() {
            expect(uc.execute()).toThrow(ProblemNotFoundError);
        }

        return {
            whenCommandIs,
            whenProblemIsFound,
            thenShouldThrowInvalidStatusException,
            thenShouldThrowProblemNotFoundException
        };
    }
});
