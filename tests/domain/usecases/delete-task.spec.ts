import { DeleteTask } from "@/core/domain/usecases/DeleteTask";
import { TaskIdInvalidError, UserIdInvalidError } from "@/core/domain/errors";
import { mockDeleteTaskModel, MockDeleteTaskParams } from "@/tests/domain/mocks/models";
import { LoadTaskRepositorySpy } from "../mocks/data/load-task-mock";
import { DeleteTaskRepositoryMock } from "../mocks/data/delete-task-mock";


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
        const { sut } = makeSut()
        const params = MockDeleteTaskParams()

        const promise = sut.perform({...params, userId: 'invalid_user_id'})

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