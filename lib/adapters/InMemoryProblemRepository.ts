import { ProblemRepository } from '../core/repositories/ProblemRepository';
import { Problem } from '../core/schemas/entities';
import { MemoryDbConnection } from './database';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryProblemRepository implements ProblemRepository {
    constructor(private inMemoryDb: MemoryDbConnection) {}

    saveOne(data: Problem): Problem {
        let id = data.id;
        if (!data.id) {
            id = uuidv4();
        }
        data.id = id;
        this.inMemoryDb.problems.set(data.id, data);
        return data;
    }

    get(id: string): Problem | undefined {
        return this.inMemoryDb.problems.get(id);
    }
}
