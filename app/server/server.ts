import { Container } from "inversify";
import express, { Express } from "express";
import { buildAppRoutes } from "../routes";

export function configureServer(app: Express, container: Container) {
  app.use(express.json());
  app.use("/", buildAppRoutes(container));
}
