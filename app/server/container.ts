import { Container } from "inversify";

export function createAppContainer(): Container {
  const container = new Container();
  return container;
}
