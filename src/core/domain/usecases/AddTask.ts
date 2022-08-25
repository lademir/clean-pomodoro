import { NullTitleError } from "../errors/NullTitle";
import { Task } from "../models/Task";
import { AddTaskRepository } from "../repositories/AddTaskRepository";

export class AddTask {    
    constructor(private readonly repo: AddTaskRepository) {}
    async perform({title, description, userId}: AddTaskRepository.Params): Promise<AddTaskRepository.Result> {
        if(title === '') {
            throw new NullTitleError()
        }
        
        return await this.repo.add({title, description, userId})
    }
}