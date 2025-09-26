import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SubTaskDTO } from "./dto/sub-task.dto";
import { CreateSubTaskDTO } from "./dto/create-sub-task.dto";
import { UpdateSubTaskDTO } from "./dto/update-sub-tasl.dto";

@Injectable()
export class SubTaskService {
    constructor(private readonly prisma: PrismaService) { }

    async getSubTasks(
        taskId: string
    ): Promise<SubTaskDTO[]> {
        return await this.prisma.subTask.findMany({
            where: {
                deletedAt: null,
                ...(taskId && { taskId })
            },

            include: {
                task: true
            }
        })
    }

    async getDetailSubTask(
        taskId: string,
        id: string
    ): Promise<SubTaskDTO> {
        const subTask = await this.prisma.subTask.findFirst({
            where: {
                taskId,
                id,
                deletedAt: null,
            },

            include: {
                task: true
            }
        })

        if (!subTask || subTask.deletedAt) {
            throw new NotFoundException("Sub Task not found");
        }

        return subTask
    }

    async createSubTaskbyTask(
        taskId: string,
        createSubTaskDTO: CreateSubTaskDTO
    ): Promise<SubTaskDTO> {
        return await this.prisma.subTask.create({
            data: {
                title: createSubTaskDTO.title,
                completed: createSubTaskDTO.completed ?? false,
                taskId 
            },
            include: {
                task: true,
            }
        })
    }

    async updateSubTaskByTask(taskId: string, id: string, dto: UpdateSubTaskDTO): Promise<SubTaskDTO> {
        const subTask = await this.prisma.subTask.findFirst({
            where: {
                id,
                taskId,
                deletedAt: null
            },
        })

        if (!subTask) {
            throw new NotFoundException("Sub Task not found");
        }

        return await this.prisma.subTask.update({
            where: { id },
            data: {
                title: dto.title ?? subTask.title,
                completed: dto.completed ?? subTask.completed,
            },
            include: {
                task: true,
            },
        })
    }

    async deleteSubTaskByTask(taskId: string, id: string): Promise<void> {
        const subTask = await this.prisma.subTask.findFirst({
            where: {
                id,
                taskId,
                deletedAt: null
            },
        })

        if (!subTask) {
            throw new NotFoundException("Sub Task not found");
        }

        await this.prisma.subTask.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            },
        })
    }
}