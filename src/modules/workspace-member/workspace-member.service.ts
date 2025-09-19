import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WorkspaceMemberDTO } from "./dto/workspace-member.dto";
import { CreateWorkspaceMemberDTO } from "./dto/create-workspace-member.dto";
import { UpdateWorkspaceMemberDTO } from "./dto/update-workspace-member.dto";
import { WorkspaceMemberFilter } from "./dto/workspace-member-filter.dto";

@Injectable()
export class WorkspaceMemberServie {
    constructor(private readonly prisma: PrismaService) { }

    async getWorkspaceMember(
        workspaceId: string
    ): Promise<WorkspaceMemberDTO[]> {
        const workspaceMembers = await this.prisma.workspaceMember.findMany({
            where: { workspaceId },
            include: {
                user: true,
                workspace: true
            }
        })

        return workspaceMembers.map(wsm => ({
            id: wsm.id,
            role: wsm.role,
            userId: wsm.userId,
            workspaceId: wsm.workspaceId,
            createdAt: wsm.createdAt,
            updatedAt: wsm.updatedAt,
            deletedAt: wsm.deletedAt,
        }))
    }

    async getWorkspaceMemberById(id: string): Promise<WorkspaceMemberDTO> {
        const member = await this.prisma.workspaceMember.findUnique({
            where: { id },
            include: {
                user: true,
                workspace: true,
            },
        });

        if (!member || member.deletedAt) {
            throw new NotFoundException("Workspace member not found");
        }

        return {
            id: member.id,
            role: member.role,
            userId: member.userId,
            workspaceId: member.workspaceId,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
            deletedAt: member.deletedAt,
        }
    }

    async createWorkspaceMember(
        dto: CreateWorkspaceMemberDTO
    ): Promise<WorkspaceMemberDTO> {
        try {
            const newMember = await this.prisma.workspaceMember.create({
                data: {
                    role: dto.role,
                    userId: dto.userId,
                    workspaceId: dto.workspaceId,
                },
            });

            return newMember
        } catch {
            throw new BadRequestException("Failed to create workspace member");
        }
    }

    async updateWorkspaceMember(
        id: string,
        dto: UpdateWorkspaceMemberDTO
    ): Promise<WorkspaceMemberDTO> {
        try {
            const updated = await this.prisma.workspaceMember.update({
                where: { id },
                data: {
                    role: dto.role,
                },
            })
            return updated
        } catch {
            throw new NotFoundException("Workspace member not found");
        }
    }

    async deleteWorkspaceMember(id: string): Promise<WorkspaceMemberDTO> {
        try {
            const deleted = await this.prisma.workspaceMember.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                },
            })
            return deleted
        } catch {
            throw new NotFoundException("Workspace member not found")
        }
    }

    async searchWorkspaceMembers(
        filters: WorkspaceMemberFilter
    ): Promise<WorkspaceMemberDTO[]> {
        return this.prisma.workspaceMember.findMany({
            where: {
                deletedAt: null,
                ...(filters.userId && { userId: filters.userId }),
                ...(filters.workspaceId && { workspaceId: filters.workspaceId }),
                ...(filters.role && { role: filters.role }),
            },
            include: {
                user: true,
                workspace: true,
            },
        });
    }
}