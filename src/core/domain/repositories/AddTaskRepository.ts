import { Task, TaskStatus } from "../models/Task";
import { AddTask } from "../usecases/AddTask";

export interface AddTaskRepository {
    add(input: AddTask.Params): Promise<AddTask.Result>
}