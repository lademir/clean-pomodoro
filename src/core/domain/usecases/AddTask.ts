import { NullTitleError } from "../errors/NullTitle";
import { Task } from "../models/Task";
import { AddTaskRepository } from "../repositories/AddTaskRepository";

export class AddTask {    
    constructor(private readonly repo: AddTaskRepository) {}
    async perform({title, description}: Task): Promise<void> {
        if(title === '') {
            throw new NullTitleError()
        }
        
        await this.repo.add({title, description})
    }
}