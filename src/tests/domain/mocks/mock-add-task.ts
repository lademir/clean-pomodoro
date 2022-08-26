import { AddTaskRepository } from "../../../core/domain/repositories/AddTaskRepository";

import { faker } from '@faker-js/faker'
import { AddTask } from "../../../core/domain/usecases/AddTask";
import { mockTaskModel } from "./mock-task";
import { Task } from "../../../core/domain/models";

export const mockAddTaskAccountParams = (): AddTask.Params => {
    return {
        userId: faker.datatype.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
    }
}

export const mockAddTaskModel = (): AddTask.Model => mockTaskModel()

export class AddTaskRepositoryStub implements AddTaskRepository {
    callscount = 0
    input?: AddTask.Params
    output: AddTask.Result = {
        id: "any_id",
        userId: "any_user_id",
        title: "any_title",
        description: "any_description",
        status: "pending",
        finishedAt: null
    }
    tasks: Task[] = []

    async add({ title, description, userId }: AddTask.Params ): Promise<AddTask.Result> {
        this.callscount++
        this.tasks.push({
            id: "any_id",
            userId,
            title,
            description,
            status: "pending",
            finishedAt: null
        })
        this.input = { title, description, userId }
        return this.output
    }
}

