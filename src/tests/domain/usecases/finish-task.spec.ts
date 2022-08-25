export{}
class FinishTask{
    constructor(private readonly repo: LoadFinishTaskRepository) {}

    async perform({ id, userId }: {id: string, userId: string}): Promise<void> {
        const task = await this.repo.loadTask({id, userId})
        if(task === undefined) throw new TaskIdInvalidError()
        if(task.userId !== userId) throw new UserIdInvalidError()
        if(task.status === "done") throw new TaskAlreadyDoneError()

    }
}

interface LoadFinishTaskRepository{
    loadTask(input: { id: string, userId: string }): Promise<Task | undefined>
}


type Task = {
    id: string
    userId: string
    description: string
    finishedAt: Date
    title: string
    status: TaskStatus
}

type TaskStatus = "done" | "pending"

class TaskIdInvalidError extends Error {
    constructor() {
        super('Task id is invalid')
        this.name = 'TaskIdInvalidError'
    }
}

class UserIdInvalidError extends Error {
    constructor() {
        super('User id is invalid')
        this.name = 'UserIdInvalidError'
    }
}

class TaskAlreadyDoneError extends Error {
    constructor() {
        super('Task already done')
        this.name = 'TaskAlreadyDoneError'
    }
}

class LoadFinishTaskRepositoryMock implements LoadFinishTaskRepository{
    taskId?: string
    callscount = 0
    output?: Task = 
            {   
                id: 'any_id',
                userId: 'any_user_id',
                description: 'any_description',
                finishedAt: new Date(),
                title: 'any_title',
                status: 'pending'
            }
        
    

    async loadTask({ id }: { id: string, userId: string }): Promise<Task | undefined> {
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
    const status: TaskStatus = 'pending'

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
    
        expect(promise).rejects.toThrowError(TaskIdInvalidError)
    });
    it('should return throw if userId is invalid', async () => {
        const { sut, loadFinishTaskRepository } = makeSut()
        loadFinishTaskRepository.output = 
                {
                    id,
                    userId,
                    description,
                    finishedAt,
                    title,
                    status
                }
    
        const promise =  sut.perform({id, userId: 'invalid_user_id'})
    
        expect(promise).rejects.toThrowError(UserIdInvalidError)
    });

    it('should throw if task is already done', async () => {
        const { sut, loadFinishTaskRepository } = makeSut()
        const task = loadFinishTaskRepository.output
        if(task) task.status = 'done'

        const promise = sut.perform({ id, userId })

        expect(promise).rejects.toThrowError(TaskAlreadyDoneError)
    });
});