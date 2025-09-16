import { PrismaService } from "src/prisma/prisma.service";
import { WorkspaceDTO } from "./dto/workspace.dto";

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

    async createWorkspace() {
        
    }
}