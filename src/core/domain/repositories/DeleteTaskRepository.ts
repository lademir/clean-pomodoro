export interface DeleteTaskRepository {
    delete: (params: DeleteTaskRepository.Params) => Promise<DeleteTaskRepository.Result>
}

export namespace DeleteTaskRepository {
    export type Params = {
        id: string
    }
    export type Result = void
}