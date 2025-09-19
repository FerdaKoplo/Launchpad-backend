import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TaskDTO } from "./dto/task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskFilterDTO } from "./dto/task-filter.dto";

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }

    async getTasks(
        workspaceId?: string
    ): Promise<TaskDTO[]> {
        return this.prisma.task.findMany({
            where: {
                deletedAt: null,
                ...(workspaceId && { workspaceId }),
            },
            include: {
                workspace: true,
                comments: true,
                attachments: true,
                subTasks: true,
                tags: true,
                dependencies: true,
                dependents: true,
                recurring: true,
            },
        })
    }

    async getDetailTask(
        id: string
    ): Promise<TaskDTO> {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                workspace: true,
                comments: true,
                attachments: true,
                subTasks: true,
                tags: true,
                dependencies: true,
                dependents: true,
                recurring: true,
            },
        })

        if (!task || task.deletedAt) {
            throw new NotFoundException("Task not found");
        }

        return task
    }

    async createTask(
        createTaskDTO: CreateTaskDTO

    ): Promise<TaskDTO> {
        return this.prisma.task.create({
            data: {
                title: createTaskDTO.title,
                description: createTaskDTO.description,
                status: createTaskDTO.status,
                priority: createTaskDTO.priority,
                dueDate: createTaskDTO.dueDate,
                workspaceId: createTaskDTO.workspaceId,
            },
            include: {
                workspace: true,
                comments: true,
                attachments: true,
                subTasks: true,
                tags: true,
                dependencies: true,
                dependents: true,
                recurring: true,
            },
        })
    }

    async updateTask(
        id: string,
        updateTaskDTO: UpdateTaskDTO
    ): Promise<TaskDTO> {
        return this.prisma.task.update({
            where: { id },
            data: {
                ...(updateTaskDTO.title !== undefined && { title: updateTaskDTO.title }),
                ...(updateTaskDTO.description !== undefined && { description: updateTaskDTO.description }),
                ...(updateTaskDTO.status !== undefined && { status: updateTaskDTO.status }),
                ...(updateTaskDTO.priority !== undefined && { priority: updateTaskDTO.priority }),
                ...(updateTaskDTO.dueDate !== undefined && { dueDate: updateTaskDTO.dueDate }),
                ...(updateTaskDTO.workspaceId !== undefined && { workspaceId: updateTaskDTO.workspaceId }),
            },
            include: {
                workspace: true,
                comments: true,
                attachments: true,
                subTasks: true,
                tags: true,
                dependencies: true,
                dependents: true,
                recurring: true,
            },
        })
    }

    async deleteTask(
        id: string
    ): Promise<TaskDTO> {
        return this.prisma.task.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        })
    }

    async filterTask(filters: TaskFilterDTO): Promise<TaskDTO[]> {
        return this.prisma.task.findMany({
            where: {
                deletedAt: null,
                ...(filters.title && {
                    title: {
                        contains: filters.title,
                        mode: "insensitive",
                    },
                }),
                ...(filters.status && { status: filters.status }),
                ...(filters.priority && { priority: filters.priority }),
                ...(filters.workspaceId && { workspaceId: filters.workspaceId }),
            },
            include: {
                workspace: true,
                comments: true,
                attachments: true,
                subTasks: true,
                tags: true,
                dependencies: true,
                dependents: true,
                recurring: true,
            },
        });
    }

}