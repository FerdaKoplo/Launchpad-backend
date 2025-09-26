import { Attachment, Comment, Workspace } from "../../../../prisma/generated/prisma"

export class NoteDTO {
    id: string
    title: string
    content: string
    workspaceId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null

    workspace?: Workspace | null
    comments?: Comment[] 
    attachments?: Attachment[]
}