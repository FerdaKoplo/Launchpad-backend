import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WorkspaceSettingResponseDTO } from "./dto/workspace-setting.dto";
import { CreateWorkspaceSettingDTO } from "./dto/create-workspace-setting.dto";
import { UpdateWorkspaceSettingDTO } from "./dto/update-workspace-setting.dto";

@Injectable()
export class WorkspaceSettingService {
    constructor(private readonly prisma: PrismaService) { }

    async getWorkspaceSettings(): Promise<WorkspaceSettingResponseDTO[]> {
        return this.prisma.workspaceSetting.findMany({
            where: { deletedAt: null },
        })
    }

    async getDetailWorkspaceSetting(id: string): Promise<WorkspaceSettingResponseDTO> {
        const setting = await this.prisma.workspaceSetting.findUnique({
            where: { id },
        })

        if (!setting || setting.deletedAt)
            throw new NotFoundException("Workspace setting not found")

        return setting
    }

    async createWorkspaceSetting(
        createWorkspaceSettingDTO: CreateWorkspaceSettingDTO
    ): Promise<WorkspaceSettingResponseDTO> {
        return await this.prisma.workspaceSetting.create({
            data: {
                workspaceId: createWorkspaceSettingDTO.workspaceId,
                defaultView: createWorkspaceSettingDTO.defaultView,
                allowGuests: createWorkspaceSettingDTO.allowGuests,
                theme: createWorkspaceSettingDTO.theme
            }
        })
    }

    async updateWorkspaceSetting(
        id: string,
        updateWorkspaceSettingDTO: UpdateWorkspaceSettingDTO
    ): Promise<WorkspaceSettingResponseDTO> {
        return await this.prisma.workspaceSetting.update({
            where: { id },
            data: {
                ...(updateWorkspaceSettingDTO.defaultView !== undefined && { defaultView: updateWorkspaceSettingDTO.defaultView }),
                ...(updateWorkspaceSettingDTO.allowGuests !== undefined && { allowGuests: updateWorkspaceSettingDTO.allowGuests }),
                ...(updateWorkspaceSettingDTO.theme !== undefined && { theme: updateWorkspaceSettingDTO.theme }),
            }
        })
    }

    async deleteWorkspaceSetting(
        id: string
    ): Promise<WorkspaceSettingResponseDTO> {
        return await this.prisma.workspaceSetting.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        })
    }

    async searchWorkspaceSetting(
        filters: Partial<{ allowGuests: boolean; theme: string; defaultView: string }>
    ): Promise<WorkspaceSettingResponseDTO[]> {
        return this.prisma.workspaceSetting.findMany({
            where: {
                deletedAt: null,
                ...(filters.allowGuests !== undefined && { allowGuests: filters.allowGuests }),
                ...(filters.theme && { theme: filters.theme as any }),
                ...(filters.defaultView && { defaultView: filters.defaultView as any }),
            },
        });
    }
}