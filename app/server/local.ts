import * as express from 'express';
import ServerConfiguration from './conf';
import { configureServer } from './server';
import { createAppContainer } from './container';
import { initDatabase } from '../../lib/adapters/database';

export function launchWarnerServer() {
    const app = express();
    const PORT = ServerConfiguration.PORT;

    const database = initDatabase();

    app.listen(PORT, () => {
        const container = createAppContainer(database);
        configureServer(app, container);
        console.info(`SERVER started on port : ${PORT}`);
    });
}

launchWarnerServer();
