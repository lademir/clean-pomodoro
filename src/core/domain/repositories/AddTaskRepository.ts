import { AddTask } from "@/core/domain/usecases/AddTask";
import { TaskDto } from "@/core/infra/db/dto/task-dto";
import { TaskStatus } from "../models";

export interface AddTaskRepository {
    add(input: AddTaskRepository.Params): Promise<AddTaskRepository.Result>
}

export namespace AddTaskRepository {
    export type Params = AddTask.Params
    export type Result = TaskDto
}