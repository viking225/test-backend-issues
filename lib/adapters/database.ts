type Issue = {
    id: number;
}


type Problem = {
    id: string
}

type Ticket = {
    id: string
}


export function initDatabase() {
    const issues = new Map<string, Issue>();
    const problems = new Map<string, Problem>();
    const tickets = new Map<string, Ticket>();

    return {
        issues,
        problems,
        tickets
    };
}
