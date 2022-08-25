export type Task = {
    id: string
    userId: string
    description: string
    finishedAt: Date
    title: string
    status: TaskStatus
}

export type TaskStatus = "done" | "pending"