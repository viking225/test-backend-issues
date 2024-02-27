import { Router } from "express";
import { Container } from "inversify";
import { APP_IDENTIFIERS } from "../../lib/core/constants/symbol";
import { CreateIssuesUseCase } from "../../lib/core/usecases/CreateIssuesUseCase";
import {Request, Response} from 'express'

export function buildIssueController(container: Container) {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    const useCase = container.get<CreateIssuesUseCase>(APP_IDENTIFIERS.CreateIssuesUseCase)
    const result = useCase.with({items: req.body}).execute()
    res.sendStatus(200).send(result)
  })

  return router;
}
