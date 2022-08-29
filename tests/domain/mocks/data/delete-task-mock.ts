import { DeleteTaskRepository } from "@/core/domain/repositories";

export class DeleteTaskRepositoryMock implements DeleteTaskRepository {
    callscount = 0
    id?: string

    async delete({ id }: DeleteTaskRepository.Params): Promise<DeleteTaskRepository.Result> {
        this.callscount++
        this.id = id
    }
}