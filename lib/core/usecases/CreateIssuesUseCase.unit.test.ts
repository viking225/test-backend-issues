import 'reflect-metadata';

import { InvalidCommandError } from '../schemas/errors';
import { CreateIssueCommand, CreateIssuesUseCase } from './CreateIssuesUseCase';
import { Issue, Problem } from '../schemas/entities';
import { IssueRepository } from '../repositories/IssueRepository';
import { ProblemRepository } from '../repositories/ProblemRepository';

describe('CreateIssuesUseCase', () => {
    let sut: ReturnType<typeof createSut>;

    beforeEach(() => {
        sut = createSut();
    });

    it('Should return empty array if no issues', () => {
        sut.whenCommandIs({
            items: [],
        });

        sut.thenShouldReturn([]);
    });

    it('Should return 3 issues and 2 problems', () => {
        sut.whenCommandIs({
            items: [
                {
                    video: 'test',
                    category: 'last',
                    userId: 10,
                    comment: 'beau',
                },
                {
                    video: 'data',
                    category: 'second',
                    userId: 10,
                    comment: 'beaugar',
                },
                {
                    video: 'data',
                    category: 'second',
                    userId: 30,
                    comment: 'moche',
                },
            ],
        });

        sut.thenShouldReturn([
            new Issue({
                id: '1',
                comment: 'beau',
                problemId: '1',
            }),
            new Issue({
                id: '2',
                comment: 'beaugar',
                problemId: '2',
            }),
            new Issue({
                id: '3',
                comment: 'moche',
                problemId: '2',
            }),
        ]);
    });

    it('Should return 2 issues with 2 problems', () => {
        sut.whenCommandIs({
            items: [
                {
                    video: 'test',
                    category: 'first',
                    userId: 10,
                    comment: 'beau',
                },
                {
                    video: 'data',
                    category: 'second',
                    userId: 30,
                    comment: 'moche',
                },
            ],
        });

        sut.thenShouldReturn([
            new Issue({
                id: '1',
                comment: 'beau',
                problemId: '1',
            }),
            new Issue({
                id: '2',
                comment: 'moche',
                problemId: '2',
            }),
        ]);
    });

    function createSut() {
        let issueCount = 1;
        let problemCount = 1;
        const saveProblemMock = jest.fn().mockImplementation((problem) => {
            problem.id = `${problemCount}`;
            problemCount++;
            return problem;
        });
        const issueRepo = {
            save: jest.fn().mockImplementation((issues: Issue[]) => {
                return issues.map((issue) => {
                    issue.id = `${issueCount}`;
                    issueCount++;
                    return issue;
                });
            }),
        } as unknown as IssueRepository;

        const problemRepo = {
            saveOne: saveProblemMock,
        } as unknown as ProblemRepository;

        const uc = new CreateIssuesUseCase(issueRepo, problemRepo);

        function whenCommandIs(command: CreateIssueCommand) {
            uc.command = command;
        }

        function thenShouldReturn(data: unknown) {
            expect(uc.execute()).toEqual(data);
        }

        function thenShouldSaveProblems(problems: Problem[]) {
            expect(saveProblemMock).toHaveBeenCalled();
            expect(saveProblemMock.mock.calls[0]).toEqual(problems);
        }

        return {
            whenCommandIs,
            thenShouldReturn,
            thenShouldSaveProblems,
        };
    }
});
