export type Task = {
    id: string
    userId: string
    title: string
    description?: string
    status: TaskStatus
    finishedAt: Date | null
    limitDate: Date | null
}

export type TaskStatus = "done" | "pending" | "late" | "done late"