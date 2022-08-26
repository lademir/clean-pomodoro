import { TaskAlreadyDoneError } from "../errors/TaskAlreadyDone";
import { TaskIdInvalidError } from "../errors/TaskIdInvalid";
import { UserIdInvalidError } from "../errors/UserIdInvalid";
import { LoadFinishTaskRepository } from "../repositories/FinishTaskRepository";

export class FinishTask{
    constructor(private readonly repo: LoadFinishTaskRepository) {}

    async perform({ id, userId }: {id: string, userId: string}): Promise<void> {
        const task = await this.repo.loadTask({id, userId})
        if(task === undefined) throw new TaskIdInvalidError()
        if(task.userId !== userId) throw new UserIdInvalidError()
        if(task.status === "done") throw new TaskAlreadyDoneError()

        task.status = "done"
        task.finishedAt = new Date()
    }
}