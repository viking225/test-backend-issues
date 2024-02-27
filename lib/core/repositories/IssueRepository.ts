import { Issue } from '../schemas/entities';

export interface IssueRepository {
    save(data: Issue | Issue[]): Issue[];
    get(id: string): Issue;
    getByProblemId(problemId: string): Issue[]
}
