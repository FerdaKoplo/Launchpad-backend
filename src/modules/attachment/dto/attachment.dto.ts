import { FileType, Note, Task, User } from "../../../../prisma/generated/prisma"

export class AttachmentDTO {
  id: string
  filename: string
  filetype?: FileType | null
  url: string
  uploadedBy: string
  taskId?: string | null
  noteId?: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user?: User | null
  task?: Task | null
  note?: Note | null
}
