export enum IssueStatus {
    waiting = 'waiting',
    grouped = 'grouped',
}
export class Issue {
    id: string;
    comment: string;
    problemId: string;
    status: IssueStatus;

    constructor(data: Partial<Issue> = {}) {
        Object.assign(this, data);
    }
}

export enum ProblemStatus {
    pending = 'pending',
    ready = 'ready',
    open = 'open',
    closed = 'closed',
}
export class Problem {
    id: string;
    video: string;
    category: string;
    status: ProblemStatus;

    constructor(data: Partial<Problem> = {}) {
        Object.assign(this, data);
    }
}

export class Ticket {
    id: string;
}
