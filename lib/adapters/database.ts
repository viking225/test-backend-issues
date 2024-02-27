import { Issue, Problem, Ticket } from "../core/schemas/entities";

export function initDatabase() {
  const issues = new Map<string, Issue>();
  const problems = new Map<string, Problem>();
  const tickets = new Map<string, Ticket>();

  return {
    issues,
    problems,
    tickets,
  };
}
