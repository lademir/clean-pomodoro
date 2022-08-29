import { Task } from "@/core/domain/models";
import { DeleteTask } from "@/core/domain/usecases/DeleteTask";
import { mockTaskModel } from "./mock-task";


export const MockDeleteTaskParams = (): DeleteTask.Params => {
    const id = 'any_task_id'
    const userId = 'any_user_id'
    return {
        id, userId
    }
}

export const mockDeleteTaskModel = (): Task => mockTaskModel()