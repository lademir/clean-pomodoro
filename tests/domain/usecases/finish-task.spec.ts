import { TaskAlreadyDoneError, TaskIdInvalidError, UserIdInvalidError } from "@/core/domain/errors";
import { TaskStatus } from "@/core/domain/models";
import { FinishTask } from "@/core/domain/usecases";
import { LoadTaskRepositorySpy } from "../mocks/data/load-task-mock";


type SutTypes = {
    sut: FinishTask
    loadFinishTaskRepository: LoadTaskRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadFinishTaskRepository = new LoadTaskRepositorySpy()
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