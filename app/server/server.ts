import { Container } from "inversify";
import * as express from "express";

import { buildAppRoutes } from "../routes";

export function configureServer(app: express.Express, container: Container) {
  app.use(express.json());
  app.use("/", buildAppRoutes(container));
}
