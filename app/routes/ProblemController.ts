import { Router } from 'express';
import { Container } from 'inversify';
import { Request, Response } from 'express';
import { UpdateProblemStatus } from '../../lib/core/usecases/UpdateProblemStatus';
import { APP_IDENTIFIERS } from '../../lib/core/constants/symbol';
import { ProblemStatus } from '../../lib/core/schemas/entities';
import { ProblemInvalidStatusError } from '../../lib/core/schemas/errors';

export function buildProblemController(container: Container) {
    const router = Router();

    router.put(
        '/:id/update-status/:status',
        async (req: Request, res: Response) => {
            console.log(req.params);
            const id = req.params['id'];
            const status = req.params['status'];

            if (!id || !status) {
                return res.sendStatus(400);
            }

            try {
                const useCase = container.get<UpdateProblemStatus>(
                    APP_IDENTIFIERS.UpdateProblemStatusUseCase
                );
                useCase.with({
                    id,
                    status: status as ProblemStatus,
                });
                return res.sendStatus(200);
            } catch (e) {
                console.error(e);
                if (e instanceof ProblemInvalidStatusError) {
                    return res.sendStatus(400);
                }
                return res.sendStatus(500);
            }
        }
    );
    return router;
}
