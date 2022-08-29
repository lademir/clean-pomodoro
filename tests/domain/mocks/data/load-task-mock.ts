import { Task } from "@/core/domain/models";
import { LoadTaskRepository } from "@/core/domain/repositories";
import { mockTaskModel } from "../models";

export class LoadTaskRepositorySpy implements LoadTaskRepository {
    taskId?: string
    userId?: string
    callscount = 0
    output?: Task = mockTaskModel()

    async loadTask({ id, userId }: LoadTaskRepository.Params): Promise<LoadTaskRepository.Result> {
        this.taskId = id
        this.userId = userId
        this.callscount++
        return this.output
    }
}