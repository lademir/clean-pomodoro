import { TaskIdInvalidError, UserIdInvalidError } from "../errors";
import { Task } from "../models";
import { DeleteTaskRepository, LoadTaskRepository } from "../repositories";

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