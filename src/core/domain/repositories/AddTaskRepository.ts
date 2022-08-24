import { Task } from "../models/Task";

export interface AddTaskRepository {
    add(input: Task): Promise<void>
}