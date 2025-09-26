import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TaskDependencyDTO } from "./dto/task-dependency.dto";
import { CreateTaskDependencyDTO } from "./dto/create-task-dependency.dto";
import { UpdateTaskDependencyDTO } from "./dto/update-task-dependency.dto";
import { FilterTaskDependencyDTO } from "./dto/filter-task-dependency.dto";

@Injectable()
export class TaskDependencyService {
    constructor(private readonly prisma: PrismaService) { }

    async getTaskDependencies(
        taskId: string
    ): Promise<TaskDependencyDTO[]> {
        return await this.prisma.taskDependency.findMany({
            where: {
                taskId,
                deletedAt: null
            },

            include: {
                task: true,
                dependency: true
            }
        })
    }

    async getDetailTaskDependency(
        id: string,
        taskId: string
    ): Promise<TaskDependencyDTO> {
        const taskDependency = await this.prisma.taskDependency.findFirst({
            where: {
                id,
                taskId
            },

            include: {
                dependency: true,
                task: true
            }
        })

        if (!taskDependency || taskDependency.deletedAt)
            throw new NotFoundException("Task dependency not found");

        return taskDependency
    }

    async createTaskDependency(
        taskId : string,
        createTaskDependencyDTO: CreateTaskDependencyDTO
    ): Promise<TaskDependencyDTO> {
        return await this.prisma.taskDependency.create({
            data: {
                taskId,
                dependsOn: createTaskDependencyDTO.dependsOn
            },
            include: {
                dependency: true,
                task: true
            }
        })
    }

    async updateTaskDependency(
        id: string,
        taskId : string,
        updateTaskDependency: UpdateTaskDependencyDTO
    ) {
        return await this.prisma.taskDependency.update({
            where: { id },
            data: {
                ...(updateTaskDependency.dependsOn !== undefined && { dependsOn: updateTaskDependency.dependsOn }),
            },
            include: {
                dependency: true,
                task: true
            }
        })
    }

    async deleteTaskDependency(
        id: string
    ): Promise<TaskDependencyDTO> {
        return await this.prisma.taskDependency.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async filterTaskDependency(
        filters: FilterTaskDependencyDTO
    ): Promise<TaskDependencyDTO[]> {
        return await this.prisma.taskDependency.findMany({
            where: {
                deletedAt: null,
                ...(filters.taskId && { taskId: filters.taskId }),
                ...(filters.dependsOn && { dependsOn: filters.dependsOn }),
                
                // check parents task workspace
                ...(filters.workspaceId && {
                    task: { workspaceId: filters.workspaceId }
                })
            },
            include : {
                task : true,
                dependency : true
            }
        })
    }
}