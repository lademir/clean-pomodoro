import { TaskAlreadyDoneError } from "../../../core/domain/errors/TaskAlreadyDone";
import { TaskIdInvalidError } from "../../../core/domain/errors/TaskIdInvalid";
import { UserIdInvalidError } from "../../../core/domain/errors/UserIdInvalid";
import { Task, TaskStatus } from "../../../core/domain/models";
import { LoadTaskRepository } from "../../../core/domain/repositories/LoadTaskRepository";
import { FinishTask } from "../../../core/domain/usecases/FinishTask";
class LoadFinishTaskRepositorySpy implements LoadTaskRepository {
    taskId?: string
    callscount = 0
    output?: Task = 
            {   
                id: 'any_id',
                userId: 'any_user_id',
                description: 'any_description',
                finishedAt: null,
                title: 'any_title',
                status: 'pending'
            }
        
    

    async loadTask({ id }: LoadTaskRepository.Params): Promise<LoadTaskRepository.Result> {
        this.taskId = id
        this.callscount++
        return this.output
    }
}

type SutTypes = {
    sut: FinishTask
    loadFinishTaskRepository: LoadFinishTaskRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadFinishTaskRepository = new LoadFinishTaskRepositorySpy()
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

    it('should change task status to done', async () => {
        const { loadFinishTaskRepository, sut } = makeSut()

        await sut.perform({ id, userId })

        expect(loadFinishTaskRepository.output?.status).toBe('done')
        expect(loadFinishTaskRepository.output?.finishedAt).not.toBeNull()
    });
});