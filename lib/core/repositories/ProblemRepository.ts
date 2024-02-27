import { Problem } from '../schemas/entities';

export interface ProblemRepository {
    saveOne(data: Problem): Problem;
    save(data: Problem | Problem[]): Problem[];
    get(id: string): Problem;
}
