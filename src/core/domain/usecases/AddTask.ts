import { NullTitleError } from "../errors/NullTitle";
import { Task, TaskStatus } from "../models/Task";
import { AddTaskRepository } from "../repositories/AddTaskRepository";

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

    export type Result = {
        id: string
        userId: string
        title: string
        description: string
        status: TaskStatus
        finishedAt: Date | null
    }

    export type Model = Task
}

