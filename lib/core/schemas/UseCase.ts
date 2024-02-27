import { decorate, injectable } from "inversify";

export abstract class UseCase<Commands, Response> {
  command: Commands;

  with(command: Commands) {
    this.command = command;
    return this;
  }

  abstract execute(): Response | Promise<Response>;
}

decorate(injectable(), UseCase);
