import { Problem, ProblemStatus, Ticket } from '../schemas/entities';
import {
    ProblemInvalidStatusError,
    ProblemNotFoundError,
    TicketThridPartyTypeError,
} from '../schemas/errors';
import { CreateTicketOnThirdParty } from './CreateTicketOnThirdParty';

describe('CreateTicketOnThirdParty', () => {
    let sut: ReturnType<typeof createSut>;

    beforeEach(() => {
        sut = createSut();
    });

    it('Should throw an error when ticket provider is unknow', () => {
        sut.whenCommandIs({
            type: 'amazon',
            problemId: 'dos',
        });

        sut.thenShouldThrowAnError(TicketThridPartyTypeError);
    });

    it('Should throw an error if problem is not found', () => {
        sut.whenCommandIs({
            type: 'ThirdPartyApp1',
            problemId: 'notFound',
        });

        sut.whenProblemIsFound(null);
        sut.thenShouldThrowAnError(ProblemNotFoundError);
    });

    it('Should throw an eror if problem is not good status', () => {
        sut.whenCommandIs({
            type: 'ThirdPartyApp1',
            problemId: 'das',
        });

        sut.whenProblemIsFound(
            new Problem({
                id: 'new',
                status: ProblemStatus.closed,
            })
        );

        sut.thenShouldThrowAnError(ProblemInvalidStatusError);
    });

    it('Should return a ticket for party 1', () => {
        sut.whenCommandIs({
            type: 'ThirdPartyApp1',
            problemId: '1',
        });

        sut.whenProblemIsFound(
            new Problem({
                id: '1',
                status: ProblemStatus.ready,
            })
        );

        sut.thenShouldReturnTicket(
            new Ticket({
                app: 'ThirdPartyApp1',
            })
        );
    });

    function createSut() {
        const mockGetProblem = jest.fn();
        const problemRepo = {
            get: mockGetProblem,
        } as any;
        const ticketRepo = {
            saveOne: jest.fn().mockImplementation((ticket) => ticket),
        } as any;
        const firstParty = {createTicket: jest.fn()} as any;
        const secondParty = {createTicket: jest.fn()} as any;

        const uc = new CreateTicketOnThirdParty(
            problemRepo,
            ticketRepo,
            firstParty,
            secondParty
        );
        function whenCommandIs(command: any) {
            uc.command = command;
        }

        function whenProblemIsFound(problem: Problem | null) {
            mockGetProblem.mockImplementation(() => problem);
        }

        function thenShouldReturnTicket(ticket: Ticket) {
            const result = uc.execute();

            expect(result).toEqual(ticket);
        }

        function thenShouldThrowAnError(error: any) {
            expect(() => uc.execute()).toThrow(error);
        }

        function thenShouldReturn(ticket: Ticket) {
            const result = uc.execute();
            expect(result).toEqual(result);
        }

        return {
            whenCommandIs,
            whenProblemIsFound,
            thenShouldReturnTicket,
            thenShouldThrowAnError,
            thenShouldReturn,
        };
    }
});
