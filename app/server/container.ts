import { Container } from 'inversify';
import { APP_IDENTIFIERS } from '../../lib/core/constants/symbol';
import { CreateIssuesUseCase } from '../../lib/core/usecases/CreateIssuesUseCase';
import { MemoryDbConnection } from '../../lib/adapters/database';
import { InMemoryIssueRepository } from '../../lib/adapters/InMemoryIssueRepository';
import { InMemoryProblemRepository } from '../../lib/adapters/InMemoryProblemRepository';
import { UpdateProblemStatus } from '../../lib/core/usecases/UpdateProblemStatus';
import { FirstThirdPartyService } from '../../lib/adapters/FirstThirdPartyService';
import { SecondThirdPartyService } from '../../lib/adapters/SecondThirdPartyService';
import { CreateTicketOnThirdParty } from '../../lib/core/usecases/CreateTicketOnThirdParty';
import { InMemoryTicketRepository } from '../../lib/adapters/InMemoryTicketRepository';
import { UpdateTicketUseCase } from '../../lib/core/usecases/UpdateTicketUseCase';

export function createAppContainer(database: MemoryDbConnection): Container {
    const container = new Container();
    // Servives
    container.bind(APP_IDENTIFIERS.ThirdParty1).to(FirstThirdPartyService);
    container.bind(APP_IDENTIFIERS.ThidParty2).to(SecondThirdPartyService);
    // UseCases
    container.bind(APP_IDENTIFIERS.UpdateTicketUseCase).to(UpdateTicketUseCase);
    container
        .bind(APP_IDENTIFIERS.CreateTicketOnThirdPartyUseCase)
        .to(CreateTicketOnThirdParty);
    container.bind(APP_IDENTIFIERS.CreateIssuesUseCase).to(CreateIssuesUseCase);
    container
        .bind(APP_IDENTIFIERS.UpdateProblemStatusUseCase)
        .to(UpdateProblemStatus);
    // Repo
    container
        .bind(APP_IDENTIFIERS.TicketRepo)
        .toDynamicValue(() => new InMemoryTicketRepository(database));
    container
        .bind(APP_IDENTIFIERS.IssueRepository)
        .toDynamicValue(() => new InMemoryIssueRepository(database));
    container
        .bind(APP_IDENTIFIERS.ProblemRepository)
        .toDynamicValue(() => new InMemoryProblemRepository(database));
    return container;
}
