export abstract class UseCase<Commands, Response> {
  command: Commands;

  with(command: Commands) {
    this.command = command;
  }

  abstract execute(): Response | Promise<Response>;
}
