import { Task } from "@/core/domain/models";
import { AddTaskRepository } from "@/core/domain/repositories";
import { PrismaFactory } from "@/core/main/factories";
import { PrismaClient } from "@prisma/client";
import { TaskDto } from "../../dto/task-dto";

export class PrismaAddTaskRepository implements AddTaskRepository {
    async add(params: AddTaskRepository.Params): Promise<AddTaskRepository.Result> {
        const prisma = PrismaFactory.getPrisma()
        const task: TaskDto = await prisma.task.create({
            data: {
                userId: params.userId,
                title: params.title,
                description: params.description,
            }
        })
        return task;
    }
}