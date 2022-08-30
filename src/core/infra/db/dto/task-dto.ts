export type TaskDto = {
    id: string
    userId: string
    title: string
    description: string | null
    status: string
    finishedAt: Date | null
    limitDate: Date | null
}