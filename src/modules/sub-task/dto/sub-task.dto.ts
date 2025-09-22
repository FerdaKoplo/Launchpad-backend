import { Task } from "../../../../prisma/generated/prisma"

export class SubTaskDTO {
    id: string
    title: string
    completed: boolean
    taskId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null

    task: Task
}