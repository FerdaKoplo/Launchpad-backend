import { Event, RecurringType, Task } from "../../../../prisma/generated/prisma"

export class RecurringDTO {
    id : string
    type : RecurringType
    interval : number
    endDate : Date | null
    taskId?: string | null
    eventId?: string | null
    createdAt : Date
    updatedAt : Date
    deletedAt : Date | null

    task? : Task | null
    event? : Event | null
}