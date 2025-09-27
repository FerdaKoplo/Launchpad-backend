import { Recurring, Workspace } from "../../../../prisma/generated/prisma"

export class EventDTO {
    id : string
    title : string
    date : Date
    workspaceId : string
    createdAt : Date
    updatedAt : Date
    deletedAt : Date | null
    
    workspace? : Workspace | null
    recurring? : Recurring  | null
}