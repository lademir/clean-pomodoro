export type Task = {
    id: string
    userId: string
    title: string
    description: string
    status: TaskStatus
    finishedAt: Date | null
}

export type TaskStatus = "done" | "pending"