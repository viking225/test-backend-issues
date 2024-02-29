import {
    Problem,
    ProblemStatus,
    Ticket,
    TicketAppType,
    Issue,
} from '../schemas/entities';
import {
    ProblemInvalidStatusError,
    TicketThridPartyTypeError,
} from '../schemas/errors';
import { UpdateTicketUseCase } from './UpdateTicketUseCase';

describe('UpdateUseCase', () => {
    let sut: ReturnType<typeof createSut>;
    beforeEach(() => {
        jest.clearAllMocks();
        sut = createSut();
    });

    it('Should throw an error if app is invalid', () => {
        sut.whenCommandIs({
            type: 'lala',
            problemId: 'kaka',
        });

        sut.thenShouldThrowAnError(TicketThridPartyTypeError);
    });

    it('Should throw an error if problem status is not valid', () => {
        sut.whenCommandIs({
            type: TicketAppType.ThirdPartyApp1,
            problemId: 'thos',
        });

        sut.whenProblemIsFound(
            new Problem({
                status: ProblemStatus.closed,
            })
        );

        sut.thenShouldThrowAnError(ProblemInvalidStatusError);
    });

    it('Should update issue count to 2', () => {
        const problemId = 'thos';
        sut.whenCommandIs({
            type: TicketAppType.ThirdPartyApp1,
            problemId,
        });

        sut.whenProblemIsFound(
            new Problem({
                status: ProblemStatus.open,
                id: problemId,
            })
        );

        sut.whenTicketIsFound(
            new Ticket({
                problemId,
                reference: 'ref',
            })
        );

        sut.whenIssuesAreFound([
            new Issue({
                problemId,
            }),
            new Issue({
                problemId,
            }),
        ]);

        sut.thenShouldReturn();
        sut.thenShouldCallUpdateTicket(TicketAppType.ThirdPartyApp1, {
            issueCount: 2,
            reference: 'ref',
        });
    });

    function createSut() {
        const getProblemMock = jest.fn();
        const getByProblemAndAppMock = jest.fn();
        const getIssuesMock = jest.fn();
        const isseRepo = {
            getByProblemId: getIssuesMock,
        } as any;
        const ticketRepo = {
            getByProblemAndApp: getByProblemAndAppMock,
        } as any;
        const firstParty = {
            updateTicketIssueCount: jest.fn(),
        } as any;
        const secondParty = {
            updateTicketIssueCount: jest.fn(),
        } as any;
        const problemRepo = {
            get: getProblemMock,
        } as any;
        const uc = new UpdateTicketUseCase(
            isseRepo,
            ticketRepo,
            problemRepo,
            firstParty,
            secondParty
        );
        function whenCommandIs(command: any) {
            uc.command = command;
        }

        function thenShouldThrowAnError(error: any) {
            expect(() => uc.execute()).toThrow(error);
        }

        function whenProblemIsFound(problem: Problem | null) {
            getProblemMock.mockImplementation(() => problem);
        }

        function whenTicketIsFound(ticket: Ticket) {
            getByProblemAndAppMock.mockImplementation(() => ticket);
        }

        function whenIssuesAreFound(issues: Issue[]) {
            getIssuesMock.mockImplementation(() => issues);
        }

        function thenShouldReturn() {
            expect(() => uc.execute()).not.toThrow();
        }

        function thenShouldCallUpdateTicket(app: TicketAppType, data: any) {
            if (app === TicketAppType.ThirdPartyApp1) {
                expect(firstParty.updateTicketIssueCount).toHaveBeenCalledWith(
                    data
                );
            } else {
                expect(secondParty.updateTicketIssueCount).toHaveBeenCalledWith(
                    data
                );
            }
        }

        return {
            whenCommandIs,
            whenProblemIsFound,
            thenShouldThrowAnError,
            whenTicketIsFound,
            whenIssuesAreFound,
            thenShouldCallUpdateTicket,
            thenShouldReturn,
        };
    }
});
