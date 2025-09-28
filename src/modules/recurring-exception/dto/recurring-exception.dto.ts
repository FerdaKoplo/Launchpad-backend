import { Recurring } from "../../../../prisma/generated/prisma"

export class RecurringExceptionDTO {
  id: string
  recurringId: string
  date: Date
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  recurring?: Recurring | null
}
