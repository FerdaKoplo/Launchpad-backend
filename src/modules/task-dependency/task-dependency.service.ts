import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TaskDependencyDTO } from "./dto/task-dependency.dto";
import { CreateTaskDependencyDTO } from "./dto/create-task-dependency.dto";
import { UpdateTaskDependencyDTO } from "./dto/update-task-dependency.dto";

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
            }
        })
    }

    async getDetailTaskDependency(
        id: string,
        taskId: string
    ): Promise<TaskDependencyDTO> {
        const taskDependency = await this.prisma.taskDependency.findUnique({
            where: {
                id,
                taskId
            },

            include: {
                task: true
            }
        })

        if (!taskDependency || taskDependency.deletedAt)
            throw new NotFoundException("Task dependency not found");

        return taskDependency
    }

    async createTaskDependency(
        createTaskDependencyDTO: CreateTaskDependencyDTO
    ): Promise<TaskDependencyDTO> {
        return await this.prisma.taskDependency.create({
            data: {
                taskId: createTaskDependencyDTO.taskId,
                dependsOn: createTaskDependencyDTO.dependsOn
            },
            include: {
                task: true
            }
        })
    }

    async updateTaskDependency(
        id: string,
        updateTaskDependency: UpdateTaskDependencyDTO
    ) {
        return await this.prisma.taskDependency.update({
            where: { id },
            data: {
                ...(updateTaskDependency.dependsOn !== undefined && { dependsOn: updateTaskDependency.dependsOn }),
                ...(updateTaskDependency.taskId !== undefined && { taskId: updateTaskDependency.taskId }),
            },
            include: {
                task: true
            }
        })
    }

    async deleteTaskDependency(
        id : string
    ) : Promise<TaskDependencyDTO> {
        return await this.prisma.taskDependency.update({
            where : { id },
            data : {
                deletedAt : new Date()      
            }
        })
    }
}