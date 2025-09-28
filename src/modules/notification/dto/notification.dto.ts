import { User } from "../../../../prisma/generated/prisma"

export class NotificationsDTO {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
  deliveredAt: Date | null
  deletedAt: Date | null

  user?: User | null
}
