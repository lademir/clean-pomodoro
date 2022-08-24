
class FinishTask{
    constructor(private readonly repo: LoadFinishTaskRepository) {}

    async perform(taskId: string): Promise<void> {
        this.repo.loadTask(taskId)
    }
}

interface LoadFinishTaskRepository{
    loadTask(taskId: string): Promise<void>
}

class LoadFinishTaskRepositoryMock implements LoadFinishTaskRepository{
    taskId?: string

    async loadTask(taskId: string): Promise<void> {
        this.taskId = taskId
    }
}

describe('FinishTask', () => {
    const taskId = 'any_task_id'
    const description = 'any_description'
    it('should load task with correct ID', async () => {
        const loadFinishTaskRepository = new LoadFinishTaskRepositoryMock()
        const sut = new FinishTask(loadFinishTaskRepository)

        await sut.perform(taskId)

        expect(loadFinishTaskRepository.taskId).toBe(taskId)
    });
});