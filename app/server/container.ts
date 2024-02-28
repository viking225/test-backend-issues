import { Container } from 'inversify';
import { APP_IDENTIFIERS } from '../../lib/core/constants/symbol';
import { CreateIssuesUseCase } from '../../lib/core/usecases/CreateIssuesUseCase';
import { MemoryDbConnection } from '../../lib/adapters/database';
import { InMemoryIssueRepository } from '../../lib/adapters/InMemoryIssueRepository';
import { InMemoryProblemRepository } from '../../lib/adapters/InMemoryProblemRepository';
import { UpdateProblemStatus } from '../../lib/core/usecases/UpdateProblemStatus';

export function createAppContainer(database: MemoryDbConnection): Container {
    const container = new Container();
    // UseCases
    container.bind(APP_IDENTIFIERS.CreateIssuesUseCase).to(CreateIssuesUseCase);
    container
        .bind(APP_IDENTIFIERS.UpdateProblemStatusUseCase)
        .to(UpdateProblemStatus);
    // Repo
    container
        .bind(APP_IDENTIFIERS.IssueRepository)
        .toDynamicValue(() => new InMemoryIssueRepository(database));
    container
        .bind(APP_IDENTIFIERS.ProblemRepository)
        .toDynamicValue(() => new InMemoryProblemRepository(database));
    return container;
}
