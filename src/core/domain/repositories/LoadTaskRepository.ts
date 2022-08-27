import { Task } from "../models/Task";

export interface LoadTaskRepository{
    loadTask(input: LoadTaskRepository.Params): Promise<LoadTaskRepository.Result>
}

export namespace LoadTaskRepository {
    export type Params = {
        id: string,
        userId: string
    }

    export type Result = Task | undefined
}