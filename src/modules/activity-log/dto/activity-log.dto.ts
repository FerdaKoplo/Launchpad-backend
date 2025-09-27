import { User, Workspace } from "../../../../prisma/generated/prisma"

export class ActivityLogDTO {
  id: string
  userId: string
  workspaceId: string
  action: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user?: User | null
  workspace?: Workspace | null
}
