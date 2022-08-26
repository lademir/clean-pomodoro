import { NullTitleError } from "../../../core/domain/errors/NullTitle";
import { AddTask } from "../../../core/domain/usecases/AddTask"
import { AddTaskRepositoryStub, mockAddTaskAccountParams } from "../mocks/mock-add-task";


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

    it('should throw if title is null', async () => {
        const { sut } = makeSut()
        const addAccountParams = {...mockAddTaskAccountParams(), title: ''}

        const promise = sut.perform(addAccountParams)

        await expect(promise).rejects.toThrow(NullTitleError)
    });

    it('should add task to task list', async () => {
        const { addTaskRepository, sut } = makeSut()
        const addAccountParams = mockAddTaskAccountParams()

        await sut.perform(addAccountParams);

        expect(addTaskRepository.callscount).toBe(1)
        expect(addTaskRepository.tasks.length).toBe(1)
    });

    it('should add task with correct values', async () => {
        const { addTaskRepository, sut } = makeSut()
        const addAccountParams = mockAddTaskAccountParams()

        const output = await sut.perform(addAccountParams);

        expect(output).toStrictEqual(addTaskRepository.output)
    });
});