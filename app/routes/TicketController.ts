import { Router } from 'express';
import { Container } from 'inversify';
import { Request, Response } from 'express';
import { CreateTicketOnThirdParty } from '../../lib/core/usecases/CreateTicketOnThirdParty';
import { APP_IDENTIFIERS } from '../../lib/core/constants/symbol';
import { TicketAppType } from '../../lib/core/schemas/entities';

export function buildTicketController(container: Container) {
    const router = Router();

    router.post(
        '/create-ticket/:app/:problemId',
        (req: Request, res: Response) => {
            const app = req.params['app'];
            const problemId = req.params['problemId'];

            if (!app || !problemId) {
                return res.send(400);
            }

            const uc = container.get<CreateTicketOnThirdParty>(
                APP_IDENTIFIERS.CreateTicketOnThirdPartyUseCase
            );

            try {
                const result = uc
                    .with({
                        type: app as TicketAppType,
                        problemId,
                    })
                    .execute();

                res.status(200).send(result);
            } catch (e) {
                console.error(e);
                res.sendStatus(400);
            }
        }
    );
    return router;
}
