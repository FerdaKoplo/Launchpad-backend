import { Recurring, TaskPriority, TaskStatus } from "../../../../prisma/generated/prisma"

export class TaskDTO {
    id: string
    title: string
    description?: string | null
    status: TaskStatus
    priority: TaskPriority
    dueDate?: Date | null
    recurring?: Recurring | null
    workspaceId: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}