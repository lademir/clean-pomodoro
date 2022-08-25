import { Task } from "../../../core/domain/models";

export {}

interface DeleteTaskRepository {
    loadTask: ({}: { id: string, userId: string }) => Promise<Task | undefined>
}

describe('DeleteTask', () => {
    it('should get task with correct id', () => {
        const loadDeleteTaskRepository = new LoadDeleteTaskRepositoryMock()
    });
});