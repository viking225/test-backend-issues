import { Router } from "express";
import { Container } from "inversify";

export function buildIssueController(container: Container) {
  const router = Router();
  return router;
}
