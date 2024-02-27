import { Router } from 'express';
import { Container } from 'inversify';
import { buildIssueController } from './issueController';

export function buildAppRoutes(container: Container) {
    const router = Router();
    router.use('/issues', buildIssueController(container));
    return router;
}
