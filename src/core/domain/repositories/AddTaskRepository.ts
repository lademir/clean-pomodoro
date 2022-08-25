import { Task, TaskStatus } from "../models/Task";

export interface AddTaskRepository {
    add(input: AddTaskRepository.Params): Promise<AddTaskRepository.Result>
}

export namespace AddTaskRepository {
    export type Params = {
        userId: string
        title: string
        description: string
    }

    export type Result = {
        id: string
        userId: string
        title: string
        description: string
        status: TaskStatus
        finishedAt: Date | null
    }
}