import { Task } from "../models/Task";

export interface LoadFinishTaskRepository{
    loadTask(input: LoadFinishTask.Params): Promise<LoadFinishTask.Result>
}

export namespace LoadFinishTask{
    export type Params = {
        id: string,
        userId: string
    }

    export type Result = Task | undefined
}