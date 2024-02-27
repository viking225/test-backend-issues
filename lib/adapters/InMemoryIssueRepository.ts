import { IssueRepository } from "../core/repositories/IssueRepository";
import { Issue } from "../core/schemas/entities";
import { MemoryDbConnection } from "./database";

export class InMemoryIssueRepository implements IssueRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {
    }
    save(data: Issue | Issue[]): Issue[] {
        throw new Error("Method not implemented.");
    }
    get(id: string): Issue {
        throw new Error("Method not implemented.");
    }
    
}
