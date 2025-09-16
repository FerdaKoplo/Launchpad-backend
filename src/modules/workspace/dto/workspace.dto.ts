import { ActivityLog, Note, Tag, Task, WorkspaceMember, WorkspaceSetting, Event } from "prisma/generated/prisma";

export class WorkspaceDTO {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null

  members: WorkspaceMember[]
  tasks: Task[]
  notes: Note[]
  events: Event[]
  activity: ActivityLog[]
  tags: Tag[]
  settings?: WorkspaceSetting | null
}
