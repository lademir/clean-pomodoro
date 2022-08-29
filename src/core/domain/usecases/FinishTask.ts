import { TaskAlreadyDoneError, TaskIdInvalidError, UserIdInvalidError } from "@/core/domain/errors";
import { LoadTaskRepository } from "@/core/domain/repositories";

export class FinishTask{
    constructor(private readonly repo: LoadTaskRepository) {}

    async perform({ id, userId }: {id: string, userId: string}): Promise<void> {
        const task = await this.repo.loadTask({id, userId})
        if(task === undefined) throw new TaskIdInvalidError()
        if(task.userId !== userId) throw new UserIdInvalidError()
        if(task.status === "done") throw new TaskAlreadyDoneError()

        task.status = "done"
        task.finishedAt = new Date()
    }
}