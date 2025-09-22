import { Note, Task, User } from "../../../../prisma/generated/prisma"

export class CommentDTO {
    id: string
    content: string
    authorId: string
    taskId?: string | null
    noteId?: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null

    author?: User     
    task?: Task | null
    note?: Note | null
}