
export class TagDTO {
    id: string
    name: string
    color?: string | null
    workspaceId: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null

}