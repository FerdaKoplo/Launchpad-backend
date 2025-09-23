import { Task } from "../../../../prisma/generated/prisma"

export class TaskDependencyDTO {
    id : string
    taskId : string
    dependsOn : string
    createdAt : Date
    updatedAt : Date
    deletedAt : Date | null

    task? : Task | null
}