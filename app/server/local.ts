import express from "express";
import ServerConfiguration from "./conf";
import { configureServer } from "./server";
import { createAppContainer } from "./container";

export function launchWarnerServer() {
  const app = express();
  const PORT = ServerConfiguration.PORT;

  app.listen(PORT, () => {
    const container = createAppContainer();
    configureServer(app, container);
    console.info(`SERVER started on port : ${PORT}`);
  });
}

launchWarnerServer();
