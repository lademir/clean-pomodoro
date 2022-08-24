export {}

class AddTask {    
    constructor(private readonly repo: AddTaskRepository) {}
    async perform({}: {title: string, description: string}): Promise<void> {
        await this.repo.add({title: '', description: ''})
    }
}

interface AddTaskRepository {
    add({}: {title: string, description: string}): Promise<void>
}

class AddTaskRepositoryMock implements AddTaskRepository {
    callscount = 0

    async add({}: {title: string, description: string}): Promise<void> {
        this.callscount++
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
    });
});