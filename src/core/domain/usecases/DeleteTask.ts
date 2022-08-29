import { TaskIdInvalidError, UserIdInvalidError } from "@/core/domain/errors";
import { Task } from "@/core/domain/models";
import { DeleteTaskRepository, LoadTaskRepository } from "@/core/domain/repositories";


export class DeleteTask{
    constructor(
        private readonly loadTaskRepository: LoadTaskRepository,
        private readonly deleteTaskRepository: DeleteTaskRepository
    ) {}

    async perform({ id, userId }: DeleteTask.Params): Promise<DeleteTask.Result> {
        const task = await this.loadTaskRepository.loadTask({ id, userId })
        if(!task){
            throw new TaskIdInvalidError()
        }
        if(task.userId !== userId){
            throw new UserIdInvalidError()
        }
        this.deleteTaskRepository.delete({ id })
    }
}

export namespace DeleteTask {
    export type Params = {
        id: string
        userId: string
    }
    export type Result = void

    export type Model = Task
}