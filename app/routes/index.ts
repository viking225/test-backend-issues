import { Router } from 'express';
import { Container } from 'inversify';
import { buildIssueController } from './IssueController';
import { buildProblemController } from './ProblemController';

export function buildAppRoutes(container: Container) {
    const router = Router();
    router.use('/issues', buildIssueController(container));
    router.use('/problem', buildProblemController(container));
    return router;
}
