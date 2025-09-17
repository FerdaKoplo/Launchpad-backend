import { Role } from "../../../../prisma/generated/prisma";

export class WorkspaceMemberDTO {
    id: string;
    role: Role;
    userId: string;
    workspaceId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}