import { NullTitleError } from "@/core/domain/errors";
import { Task, TaskStatus } from "@/core/domain/models";
import { AddTaskRepository } from "@/core/domain/repositories";
import { TaskDto } from "@/core/infra/db/dto/task-dto";


export class AddTask {    
    constructor(private readonly repo: AddTaskRepository) {}
    async perform({title, description, userId}: AddTask.Params): Promise<AddTask.Result> {
        if(title === '') {
            throw new NullTitleError()
        }
        
        return await this.repo.add({title, description, userId})
    }
}

export namespace AddTask {
    export type Params = {
        title: string
        description: string
        userId: string
    }

    export type Result = TaskDto

    export type Model = Task
}

