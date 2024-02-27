import { Issue, IssueStatus, Problem, ProblemStatus } from '../schemas/entities';
import {
    ProblemInvalidStatusError,
    ProblemNotFoundError,
} from '../schemas/errors';
import {
    UpdateProblemStatus,
    UpdateProblemStatusCommand,
} from './UpdateProblemStatus';

describe('UpdateProblemStatus', () => {
    let sut: ReturnType<typeof createSut>;

    beforeEach(() => {
        sut = createSut();
    });

    it('Should throw an error if problem does not exist', () => {
        sut.whenCommandIs({
            status: ProblemStatus.closed,
            id: '1',
        });

        sut.whenProblemIsFound(null);

        sut.thenShouldThrowProblemNotFoundException();
    });

    test.each([
        { value: 'closed', refused: ['pending', 'ready', 'open'] },
        { value: 'open', refused: ['pending', 'ready'] },
        { value: 'ready', refused: ['pending'] },
    ])(
        'Should throw an error when status is $value and update to $refused',
        ({ value, refused }) => {
            for (let invalidStatus in refused) {
                sut.whenCommandIs({
                    status: invalidStatus as ProblemStatus,
                    id: 'problem',
                });
                sut.whenProblemIsFound(
                    new Problem({
                        status: value as ProblemStatus,
                    })
                );
                sut.thenShouldThrowInvalidStatusException();
            }
        }
    );

    it('Should update problem status', () => {
        const problemId = 'problem';
        sut.whenCommandIs({
            status: ProblemStatus.open,
            id: problemId,
        });

        sut.whenProblemIsFound(
            new Problem({
                status: ProblemStatus.pending,
                id: problemId,
            })
        );

        sut.thenShouldReturn(
            new Problem({
                status: ProblemStatus.open,
                id: problemId,
            })
        );
    });

    it('Should update issues status', () => {
        const problemId = 'problem';
        sut.whenCommandIs({
            status: ProblemStatus.open,
            id: problemId,
        });

        sut.whenProblemIsFound(
            new Problem({
                status: ProblemStatus.pending,
                id: problemId,
            })
        );

        sut.whenIssuesIsFound([
            new Issue({
                status: IssueStatus.waiting,
                id: '1',
                comment: "dos"
            }),
            new Issue({
                status: IssueStatus.waiting,
                id: '2',
                comment: 'trree'
            })
        ])

        sut.thenShouldHaveSaveIssues([
            new Issue({
                status: IssueStatus.grouped,
                id: '1',
                comment: "dos"
            }),
            new Issue({
                status: IssueStatus.grouped,
                id: '2',
                comment: 'trree'
            })
        ])

    })

    function createSut() {
        const saveIssueMock = jest.fn()
        const getByProblemIdMock = jest.fn()

        const getOneProblemRepo = jest.fn();
        const issueRepo = {
            save: saveIssueMock,
            getByProblemId: getByProblemIdMock
        } as any
        const problemRepo = {
            get: getOneProblemRepo,
            saveOne: jest.fn(),
        } as any;
        const uc = new UpdateProblemStatus(problemRepo, issueRepo);

        function whenCommandIs(command: UpdateProblemStatusCommand) {
            uc.with(command);
        }

        function whenProblemIsFound(problem: Problem | null) {
            getOneProblemRepo.mockImplementation(() => problem);
        }

        function whenIssuesIsFound(issues: Issue[]) {
            getByProblemIdMock.mockResolvedValueOnce(issues);
        }

        function thenShouldThrowInvalidStatusException() {
            expect(() => uc.execute()).toThrow(ProblemInvalidStatusError);
        }

        function thenShouldThrowProblemNotFoundException() {
            expect(() => uc.execute()).toThrow(ProblemNotFoundError);
        }

        function thenShouldReturn(problem: Problem) {
            expect(uc.execute()).toEqual(problem);
        }

        function thenShouldHaveSaveIssues(issues: Issue[]) {
            expect(saveIssueMock).toHaveBeenCalledWith(issues)
        }

        return {
            whenCommandIs,
            whenProblemIsFound,
            whenIssuesIsFound,
            thenShouldThrowInvalidStatusException,
            thenShouldThrowProblemNotFoundException,
            thenShouldReturn,
            thenShouldHaveSaveIssues,
        };
    }
});
