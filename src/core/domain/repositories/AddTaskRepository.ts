import { AddTask } from "@/core/domain/usecases/AddTask";

export interface AddTaskRepository {
    add(input: AddTaskRepository.Params): Promise<AddTaskRepository.Result>
}

export namespace AddTaskRepository {
    export type Params = AddTask.Params
    export type Result = AddTask.Result
}