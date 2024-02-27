import { IssueRepository } from "../core/repositories/IssueRepository";
import { Issue } from "../core/schemas/entities";
import { MemoryDbConnection } from "./database";
import { v4 as uuidv4 } from 'uuid';

export class InMemoryIssueRepository implements IssueRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {
    }
    save(data: Issue | Issue[]): Issue[] {
        if (!Array.isArray(data)) {
            data = [data]
        }
        data.forEach((issue) => {
            if (!issue.id) {
                issue.id = uuidv4()
            }
            this.inMemoryDb.issues.set(issue.id, issue);
        });
        return data;
    }
    get(id: string): Issue {
        throw new Error("Method not implemented.");
    }
    
}
