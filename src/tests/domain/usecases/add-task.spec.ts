export {}

class AddTask {    
    constructor(private readonly repo: AddTaskRepository) {}
    async perform({title, description}: Task): Promise<void> {
        await this.repo.add({title, description})
    }
}

type Task = {
    title: string
    description: string
}

interface AddTaskRepository {
    add({}: {title: string, description: string}): Promise<void>
}

class AddTaskRepositoryMock implements AddTaskRepository {
    callscount = 0
    tasks: Task[] = []

    async add({title, description}: Task): Promise<void> {
        this.callscount++
        this.tasks.push({title, description})
    }
}

type SutTypes = {
    sut: AddTask
    addTaskRepository: AddTaskRepositoryMock
}

const makeSut = (): SutTypes => {
    const addTaskRepository = new AddTaskRepositoryMock()
    const sut = new AddTask(addTaskRepository)
    return {sut, addTaskRepository}
}
describe('AddTask', () => {
    const title = 'any_title'
    const description = 'any_description'
    it('should add task to task list', async () => {
        const { addTaskRepository, sut } = makeSut()

        await sut.perform({
            title,
            description
        });

        expect(addTaskRepository.callscount).toBe(1)
        expect(addTaskRepository.tasks.length).toBe(1)
    });

    it('should add task with correct values', async () => {
        const { addTaskRepository, sut } = makeSut()

        await sut.perform({
            title,
            description
        });

        expect(addTaskRepository.tasks[0]).toEqual({
            title,
            description
        })
    });
});