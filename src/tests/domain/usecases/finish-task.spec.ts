export{}
class FinishTask{
    constructor(private readonly repo: LoadFinishTaskRepository) {}

    async perform({id, userId}: {id: string, userId: string}): Promise<void> {
        const taskGroup = await this.repo.loadTask({id, userId})
        if(taskGroup === undefined) throw new Error()
        if(taskGroup.tasks.some(task => task.userId !== userId)) throw new Error()
    }
}

interface LoadFinishTaskRepository{
    loadTask(input: {id: string, userId: string}): Promise<TaskGroup | undefined>
}

type TaskGroup = {
    tasks: Task[]
}

type Task = {
    id: string
    userId: string
    description: string
    finishedAt: Date
    title: string
    status: string
}

class LoadFinishTaskRepositoryMock implements LoadFinishTaskRepository{
    taskId?: string
    callscount = 0
    output?: TaskGroup = {
        tasks: [
            {
                id: 'any_id',
                userId: 'any_user_id',
                description: 'any_description',
                finishedAt: new Date(),
                title: 'any_title',
                status: 'any_status'
            }
        ]
    }

    async loadTask({id}: {id: string, userId: string}): Promise<TaskGroup | undefined> {
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
    const description = 'any_description'
    const finishedAt = new Date()
    const title = 'any_title'
    const status = 'any_status'

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
    
        expect(promise).rejects.toThrowError()
    });
    it('should return throw if userId is invalid', async () => {
        const { sut, loadFinishTaskRepository } = makeSut()
        loadFinishTaskRepository.output = {
            tasks: [
                {
                    id,
                    userId,
                    description,
                    finishedAt,
                    title,
                    status
                }
            ]
        }
    
        const promise =  sut.perform({id, userId: 'invalid_user_id'})
    
        expect(promise).rejects.toThrowError()
    });
});