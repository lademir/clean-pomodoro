import { TaskIdInvalidError, UserIdInvalidError } from "@/core/domain/errors";
import { LoadTaskRepository } from "@/core/domain/repositories";
import { LoadTaskRepositorySpy } from "../mocks/data/load-task-mock";
import { mockTaskModel } from "../mocks/models";

class CheckLimitDate {
    constructor (private readonly loadTaskRepository: LoadTaskRepository){}

    async perform({ id, userId }: CheckLimitDate.Params): Promise<Error | undefined> {
        const task = await this.loadTaskRepository.loadTask({ id, userId })
        if(!task) throw new TaskIdInvalidError()
        if(task.userId !== userId) throw new UserIdInvalidError()
        if(!task.limitDate) {
            return new LimitDateNotDefinedException()
        }
    }
}

namespace CheckLimitDate {
    export type Params = {
        id: string
        userId: string
    }
}

class LimitDateNotDefinedException extends Error {
    constructor() {
        super("Limit date is not defined")
    }
}

type SutTypes = {
    sut: CheckLimitDate
    loadTaskRepositorySpy: LoadTaskRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadTaskRepositorySpy = new LoadTaskRepositorySpy()
    const sut = new CheckLimitDate(loadTaskRepositorySpy)
    return {
        sut,
        loadTaskRepositorySpy
    }
}

const mockCheckLimitDateParams = (): CheckLimitDate.Params => ({
    id: 'any_id',
    userId: 'any_user_id'
})

describe('CheckLimitDate', () => {
    it('should get task data', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()

        await sut.perform(mockCheckLimitDateParams())

        expect(loadTaskRepositorySpy.taskId).toBe('any_id')
        expect(loadTaskRepositorySpy.userId).toBe('any_user_id')
        expect(loadTaskRepositorySpy.callscount).toBe(1)
    });

    it('should throw if id is invalid', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()
        loadTaskRepositorySpy.output = undefined

        const promise = sut.perform(mockCheckLimitDateParams())

        await expect(promise).rejects.toThrowError(TaskIdInvalidError)
    });
    
    it('should throw if userId is invalid', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()
        loadTaskRepositorySpy.output = {...mockTaskModel(), userId: 'invalid_user_id'}

        const promise =  sut.perform(mockCheckLimitDateParams())

        await expect(promise).rejects.toThrowError(UserIdInvalidError)
    });

    it('should return LimitDateNotDefinedException if limit date is not defined', async () => {
        const { sut, loadTaskRepositorySpy } = makeSut()

        const exception = await sut.perform(mockCheckLimitDateParams())

        expect(exception).toEqual(new LimitDateNotDefinedException())
    });

    // it('should update status to pending when now is before limit date', async () => {
    //     const { sut, loadTaskRepositorySpy } = makeSut()
    //     loadTaskRepositorySpy.output = {...mockTaskModel(), limitDate: new Date('2021-01-01')}

    //     await sut.perform(mockCheckLimitDateParams())

    //     expect(loadTaskRepositorySpy.output.status).toBe('pending')
    // });

    // it('should update status to late when now is after limit date', async () => {
    //     const { sut, loadTaskRepositorySpy } = makeSut()
    //     loadTaskRepositorySpy.output = {...mockTaskModel(), limitDate: new Date('2021-01-01')}

    //     await sut.perform(mockCheckLimitDateParams())

    //     expect(loadTaskRepositorySpy.output.status).toBe('pending')
    // });
});