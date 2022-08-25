import { Task } from "../models/Task";

export interface LoadFinishTaskRepository{
    loadTask(input: { id: string, userId: string }): Promise<Task | undefined>
}