const APP_IDENTIFIERS = {
    // Repository
    IssueRepository: Symbol.for('IssueRepository'),
    ProblemRepository: Symbol.for('ProblemRepository'),
    // UseCases
    CreateIssuesUseCase: Symbol.for('CreateIssuesUseCase'),
    UpdateProblemStatusUseCase: Symbol.for('UpdateProblemStatusUseCase'),
};

export { APP_IDENTIFIERS };
