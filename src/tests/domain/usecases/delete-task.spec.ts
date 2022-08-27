import { TaskIdInvalidError } from "../../../core/domain/errors/TaskIdInvalid";
import { UserIdInvalidError } from "../../../core/domain/errors/UserIdInvalid";
import { Task } from "../../../core/domain/models";
import { LoadTaskRepository } from "../../../core/domain/repositories/LoadTaskRepository";
import { mockTaskModel } from "../mocks/mock-task";


class DeleteTask{
    constructor(private readonly loadTaskRepository: LoadTaskRepository) {}

    async perform({ id, userId }: DeleteTask.Params): Promise<DeleteTask.Result> {
        const task = await this.loadTaskRepository.loadTask({ id, userId })
        if(!task){
            throw new TaskIdInvalidError()
        }
        if(task.userId !== userId){
            throw new UserIdInvalidError()
        }
        
    }
}

namespace DeleteTask {
    export type Params = {
        id: string
        userId: string
    }
    export type Result = void

    export type Model = Task
}

class LoadTaskRepositorySpy implements LoadTaskRepository {
    taskId?: string
    userId?: string
    callscount = 0
    output?: Task

    async loadTask({ id, userId }: LoadTaskRepository.Params): Promise<LoadTaskRepository.Result> {
        this.taskId = id
        this.userId = userId
        this.callscount++
        return this.output
    }
}

const MockDeleteTaskParams = (): DeleteTask.Params => {
    const id = 'any_task_id'
    const userId = 'any_user_id'
    return {
        id, userId
    }
}

const mockDeleteTaskModel = (): Task => mockTaskModel()

type SutTypes = {
    sut: DeleteTask
    loadTaskRepositorySpy: LoadTaskRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadTaskRepositorySpy = new LoadTaskRepositorySpy()
    const sut = new DeleteTask(loadTaskRepositorySpy)
    return {
        sut,
        loadTaskRepositorySpy
    }
}

describe('DeleteTask', () => {
    it('should get task with correct id', () => {
        const { sut, loadTaskRepositorySpy } = makeSut()
        const params = MockDeleteTaskParams()
        loadTaskRepositorySpy.output = mockDeleteTaskModel()

        sut.perform(params)

        expect(loadTaskRepositorySpy.taskId).toBe(params.id)
        expect(loadTaskRepositorySpy.callscount).toBe(1)
    });

    it('should throw if ID is invalid', async () => {
        const { sut } = makeSut()
        const params = MockDeleteTaskParams()

        const promise = sut.perform(params)

        await expect(promise).rejects.toThrowError(TaskIdInvalidError)
    });

    it('should throw if userId is invalid', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()
        loadTaskRepositorySpy.output = {...mockDeleteTaskModel(), userId: 'other_user_id'}
        const params = MockDeleteTaskParams()

        const promise = sut.perform(params)

        await expect(promise).rejects.toThrowError(UserIdInvalidError)
    });
});