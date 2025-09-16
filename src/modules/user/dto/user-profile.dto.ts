import { Theme } from "prisma/generated/prisma"

export class UserProfileDTO {
    id: string
    userId: string
    avatar?: string 
    theme? : Theme
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}