import { Problem } from '../schemas/entities';

export interface ProblemRepository {
    saveOne(data: Problem): Problem;
    get(id: string): Problem | undefined;
}
