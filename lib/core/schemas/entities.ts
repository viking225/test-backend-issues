export class Issue {
  id: string;
  comment: string;
  problemId: string;

  constructor(data: Partial<Issue> = {}) {
    Object.assign(this, data);
  }
}

export class Problem {
  id: string;
  video: string;
  category: string;
  status: 'pending' | 'ready' | 'open' | 'closed';

  constructor(data: Partial<Problem> = {}) {
    Object.assign(this, data);
  }
}

export class Ticket {
  id: string;
}
