import { DefaultView, Theme } from "../../../../prisma/generated/prisma";

export class WorkspaceSettingResponseDTO {
    id: string
    workspaceId: string
    defaultView: DefaultView
    allowGuests: boolean
    theme: Theme
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}