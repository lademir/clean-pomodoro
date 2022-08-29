import { LoadTaskRepository } from "@/core/domain/repositories";
import { LoadTaskRepositorySpy } from "../mocks/data/load-task-mock";

class CheckLimitDate {
    constructor (private readonly loadTaskRepository: LoadTaskRepository){}

    async perform({ id, userId }: LoadTaskRepository.Params): Promise<void> {
        this.loadTaskRepository.loadTask({ id, userId })
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

describe('CheckLimitDate', () => {
    it('should get task data', () => {
        const { sut, loadTaskRepositorySpy } = makeSut()

        sut.perform({ id: 'any_id', userId: 'any_user_id' })

        expect(loadTaskRepositorySpy.taskId).toBe('any_id')
        expect(loadTaskRepositorySpy.userId).toBe('any_user_id')
        expect(loadTaskRepositorySpy.callscount).toBe(1)
    });
});