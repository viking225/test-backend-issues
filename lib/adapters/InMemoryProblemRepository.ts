import { ProblemRepository } from "../core/repositories/ProblemRepository";
import { Problem } from "../core/schemas/entities";
import { MemoryDbConnection } from "./database";

export class InMemoryProblemRepository implements ProblemRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {
    }
    saveOne(data: Problem): Problem {
        throw new Error("Method not implemented.");
    }
    save(data: Problem | Problem[]): Problem[] {
        throw new Error("Method not implemented.");
    }
    get(id: string): Problem {
        throw new Error("Method not implemented.");
    }

}
