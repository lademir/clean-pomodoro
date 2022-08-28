import { TaskIdInvalidError } from "../../../core/domain/errors/TaskIdInvalid";
import { UserIdInvalidError } from "../../../core/domain/errors/UserIdInvalid";
import { Task } from "../../../core/domain/models";
import { DeleteTaskRepository } from "../../../core/domain/repositories";
import { LoadTaskRepository } from "../../../core/domain/repositories/LoadTaskRepository";
import { DeleteTask } from "../../../core/domain/usecases/DeleteTask";
import { mockDeleteTaskModel, MockDeleteTaskParams } from "../mocks/mock-delete-task";
import { mockTaskModel } from "../mocks/mock-task";


class LoadTaskRepositorySpy implements LoadTaskRepository {
    taskId?: string
    userId?: string
    callscount = 0
    output?: Task = mockTaskModel()

    async loadTask({ id, userId }: LoadTaskRepository.Params): Promise<LoadTaskRepository.Result> {
        this.taskId = id
        this.userId = userId
        this.callscount++
        return this.output
    }
}

class DeleteTaskRepositoryMock implements DeleteTaskRepository {
    callscount = 0
    id?: string

    async delete({ id }: DeleteTaskRepository.Params): Promise<DeleteTaskRepository.Result> {
        this.callscount++
        this.id = id
    }
}




type SutTypes = {
    sut: DeleteTask
    loadTaskRepositorySpy: LoadTaskRepositorySpy
    deleteTaskRepositoryMock: DeleteTaskRepositoryMock
}

const makeSut = (): SutTypes => {
    const loadTaskRepositorySpy = new LoadTaskRepositorySpy()
    const deleteTaskRepositoryMock = new DeleteTaskRepositoryMock()
    const sut = new DeleteTask(loadTaskRepositorySpy, deleteTaskRepositoryMock)
    return {
        sut,
        loadTaskRepositorySpy,
        deleteTaskRepositoryMock
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
        const { sut, loadTaskRepositorySpy } = makeSut()
        loadTaskRepositorySpy.output = undefined
        const params = MockDeleteTaskParams()

        const promise = sut.perform(params)

        await expect(promise).rejects.toThrowError(TaskIdInvalidError)
    });
    it('should throw if userId not match with userId on task', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()
        loadTaskRepositorySpy.output = {...mockDeleteTaskModel(), userId: 'other_user_id'}
        const params = MockDeleteTaskParams()

        const promise = sut.perform(params)

        await expect(promise).rejects.toThrowError(UserIdInvalidError)
    });
    it('should delete task', async () => {
        const { sut, deleteTaskRepositoryMock } = makeSut()
        const params = MockDeleteTaskParams()

        await sut.perform(params)

        expect(deleteTaskRepositoryMock.id).toBe(params.id)
        expect(deleteTaskRepositoryMock.callscount).toBe(1)
    });
});