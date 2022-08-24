export{}
class FinishTask{
    constructor(private readonly repo: LoadFinishTaskRepository) {}

    async perform({id, userId}: {id: string, userId: string}): Promise<void> {
        const task = await this.repo.loadTask({id, userId})
        if(task === undefined) throw new Error()
    }
}

interface LoadFinishTaskRepository{
    loadTask(input: {id: string, userId: string}): Promise<any>
}

class LoadFinishTaskRepositoryMock implements LoadFinishTaskRepository{
    taskId?: string
    callscount = 0
    output: any = 'any_value'

    async loadTask({id}: {id: string, userId: string}): Promise<any> {
        this.taskId = id
        this.callscount++
        return this.output
    }
}

type SutTypes = {
    sut: FinishTask
    loadFinishTaskRepository: LoadFinishTaskRepositoryMock
}

const makeSut = (): SutTypes => {
    const loadFinishTaskRepository = new LoadFinishTaskRepositoryMock()
    const sut = new FinishTask(loadFinishTaskRepository)
    return {
        sut,
        loadFinishTaskRepository
    }
}

describe('FinishTask', () => {
    const id = 'any_task_id'
    const userId = 'any_user_id'
    it('should get task with correct id', async () => {
        const { sut, loadFinishTaskRepository } = makeSut()
    
        await sut.perform({id, userId})
    
        expect(loadFinishTaskRepository.taskId).toBe(id)
        expect(loadFinishTaskRepository.callscount).toBe(1)
    });
    it('should return throw if taskId is invalid', async () => {
        const { sut, loadFinishTaskRepository } = makeSut()
        loadFinishTaskRepository.output = undefined
    
        const promise =  sut.perform({id, userId})
    
        expect(promise).rejects.toThrow()
    });
});