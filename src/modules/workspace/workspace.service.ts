import { PrismaService } from "src/prisma/prisma.service";
import { WorkspaceDTO } from "./dto/workspace.dto";
import { CreateWorkspaceDTO } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDTO } from "./dto/update-workspace.dto";
import { WorkspaceFilterDTO } from "./dto/workspace-filter.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkspaceService {
    constructor(private readonly prisma: PrismaService) { }

    async getWorkspaces(): Promise<WorkspaceDTO[]> {
        const workspaces = await this.prisma.workspace.findMany({
            where: { deletedAt: null },
            include: {
                members: true,
                tasks: true,
                notes: true,
                events: true,
                activity: true,
                tags: true,
                settings: true,
            },
        });

        return workspaces.map(ws => ({
            id: ws.id,
            name: ws.name,
            createdAt: ws.createdAt,
            updatedAt: ws.updatedAt,
            deletedAt: ws.deletedAt,
            members: ws.members,
            tasks: ws.tasks,
            notes: ws.notes,
            events: ws.events,
            activity: ws.activity,
            tags: ws.tags,
            settings: ws.settings,
        }));
    }

    async getDetailWorkspace(id: string): Promise<WorkspaceDTO> {
        return await this.prisma.workspace.findUniqueOrThrow({
            where: { id },
            include: {
                members: true,
                tasks: true,
                notes: true,
                events: true,
                activity: true,
                tags: true,
                settings: true,
            },
        });
    }


    async createWorkspace(createWorkspace: CreateWorkspaceDTO): Promise<WorkspaceDTO> {
        return await this.prisma.workspace.create({
            data: {
                name: createWorkspace.name,
                deletedAt: createWorkspace.deletedAt ?? null,
            },
            include: {
                members: true,
                tasks: true,
                notes: true,
                events: true,
                activity: true,
                tags: true,
                settings: true,
            },
        });
    }

    async updateWorkspace(id: string, updateWorkspace: UpdateWorkspaceDTO): Promise<WorkspaceDTO> {
        return await this.prisma.workspace.update({
            where: { id },
            data: {
                ...(updateWorkspace.name !== undefined && { name: updateWorkspace.name }),
                ...(updateWorkspace.deletedAt !== undefined && { deletedAt: updateWorkspace.deletedAt }),
            },
            include: {
                members: true,
                tasks: true,
                notes: true,
                events: true,
                activity: true,
                tags: true,
                settings: true,
            }
        })
    }

    async deleteWorkpsace(id: string) {
        return this.prisma.workspace.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async searchWorkspace(filter: WorkspaceFilterDTO): Promise<WorkspaceDTO[]> {
        return this.prisma.workspace.findMany({
            where: {
                ...(filter.includeDeleted ? {} : { deletedAt: null }),
                ...(filter.search ? { name: { contains: filter.search, mode: "insensitive" } } : {}),
            },

            include: {
                members: true,
                tasks: true,
                notes: true,
                events: true,
                activity: true,
                tags: true,
                settings: true
            }
        })
    }

}