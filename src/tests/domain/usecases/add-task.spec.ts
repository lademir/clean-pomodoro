import { NullTitleError } from "../../../core/domain/errors/NullTitle";
import { Task } from "../../../core/domain/models/Task";
import { AddTaskRepository } from "../../../core/domain/repositories/AddTaskRepository";
import { AddTask } from "../../../core/domain/usecases/AddTask"
class AddTaskRepositoryStub implements AddTaskRepository {
    callscount = 0
    input?: AddTaskRepository.Params
    output: AddTaskRepository.Result = {
        id: "any_id",
        userId: "any_user_id",
        title: "any_title",
        description: "any_description",
        status: "pending",
        finishedAt: null
    }
    tasks: Task[] = []

    async add({ title, description, userId }: AddTaskRepository.Params ): Promise<AddTaskRepository.Result> {
        this.callscount++
        this.tasks.push({
            id: "any_id",
            userId,
            title,
            description,
            status: "pending",
            finishedAt: null
        })
        this.input = {title, description, userId}
        return this.output
    }
}

type SutTypes = {
    sut: AddTask
    addTaskRepository: AddTaskRepositoryStub
}

const makeSut = (): SutTypes => {
    const addTaskRepository = new AddTaskRepositoryStub()
    const sut = new AddTask(addTaskRepository)
    return { sut, addTaskRepository }
}
describe('AddTask', () => {
    const title = 'any_title'
    const description = 'any_description'
    const userId = 'any_user_id'

    it('should throw if title is null', async () => {
        const { sut } = makeSut()

        const promise = sut.perform({title: '', description, userId})

        await expect(promise).rejects.toThrow(NullTitleError)
    });

    it('should add task to task list', async () => {
        const { addTaskRepository, sut } = makeSut()

        await sut.perform({
            title,
            description,
            userId
        });

        expect(addTaskRepository.callscount).toBe(1)
        expect(addTaskRepository.tasks.length).toBe(1)
    });

    it('should add task with correct values', async () => {
        const { addTaskRepository, sut } = makeSut()

        const output = await sut.perform({
            title,
            description,
            userId
        });

        expect(output).toStrictEqual(addTaskRepository.output)
    });
});