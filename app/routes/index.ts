import { Router } from "express";
import { Container } from "inversify";

export function buildAppRoutes(container: Container) {
    const router = Router();
    return router;
}
