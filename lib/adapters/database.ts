import { Issue, Problem, Ticket } from "../core/schemas/entities";

export type MemoryDbConnection = {
  issues: Map<string, Issue>;
  problems: Map<string, Problem>;
  tickets: Map<string, Ticket>
}


export function initDatabase(): MemoryDbConnection {
  const issues = new Map<string, Issue>();
  const problems = new Map<string, Problem>();
  const tickets = new Map<string, Ticket>();

  return {
    issues,
    problems,
    tickets,
  };
}
