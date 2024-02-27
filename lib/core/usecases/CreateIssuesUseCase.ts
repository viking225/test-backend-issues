import { inject, injectable } from "inversify";
import "reflect-metadata";

import { UseCase } from "../schemas/UseCase";
import { Issue, Problem } from "../schemas/entities";
import { APP_IDENTIFIERS } from "../constants/symbol";
import { IssueRepository } from "../repositories/IssueRepository";
import { ProblemRepository } from "../repositories/ProblemRepository";

export type CreateIssueCommand = {
  items: {
    video: string;
    category: string;
    userId: number;
    comment: string;
  }[];
};

@injectable()
export class CreateIssuesUseCase extends UseCase<CreateIssueCommand, Issue[]> {
  public constructor(
    @inject(APP_IDENTIFIERS.IssueRepository)
    private readonly issueRepo: IssueRepository,
    @inject(APP_IDENTIFIERS.ProblemRepository)
    private readonly problemRepo: ProblemRepository
  ) {
    super();
  }
  execute(): Issue[] | Promise<Issue[]> {

    if (!this.command.items.length) {
        return [];
    }

    let issuesToSave: Issue[] = [];
    const problemDictionnary: {[Id: string]: {video: string; category: string; issues: Issue[]}} = {}

    this.command.items.forEach((item)  => {

        if (!problemDictionnary[`${item.video}-${item.category}`]) {
            problemDictionnary[`${item.video}-${item.category}`] = {video: item.video, category: item.category, issues: []}
        }
        problemDictionnary[`${item.video}-${item.category}`].issues.push(new Issue({
            comment: item.comment
        }))
    });

    for (const id in problemDictionnary) {
        const item = problemDictionnary[id]
        const savedProblem = this.problemRepo.saveOne(new Problem({
            video: item.video,
            category: item.category,
            status: 'open'
        }))
        issuesToSave =  [...issuesToSave, ...problemDictionnary[id].issues.map((issue) => {
            issue.problemId = savedProblem.id
            return issue;
        })]
    }
    const savedIssues = this.issueRepo.save(issuesToSave);


    return savedIssues;
  }
}
