const APP_IDENTIFIERS = {
    // Services
    ThirdParty1: Symbol.for('thirdParty1'),
    ThidParty2: Symbol.for('thirdParty2'),
    // Repository
    IssueRepository: Symbol.for('IssueRepository'),
    ProblemRepository: Symbol.for('ProblemRepository'),
    TicketRepo: Symbol.for('ticketRepo'),
    // UseCases
    CreateIssuesUseCase: Symbol.for('CreateIssuesUseCase'),
    UpdateProblemStatusUseCase: Symbol.for('UpdateProblemStatusUseCase'),
};

export { APP_IDENTIFIERS };
