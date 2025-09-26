import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RecurringDTO } from "./dto/recurring.dto";
import { CreateRecurringDTO } from "./dto/create-recurring.dto";
import { UpdateRecurringDTO } from "./dto/update-recurring.dto";
import { FilterRecurringDTO } from "./dto/filter-recurring.dto";

@Injectable()
export class RecurringService {
    constructor(private readonly prisma: PrismaService) { }

    async getRecurrings(
        taskId: string,
        eventId: string
    ): Promise<RecurringDTO[]> {
        return await this.prisma.recurring.findMany({
            where: {
                ...(taskId && { taskId }),
                ...(eventId && { eventId }),
                deletedAt: null
            },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    }

    async getDetailRecurring(
        id: string,
    ): Promise<RecurringDTO> {
        const recurring = await this.prisma.recurring.findUnique({
            where: { id },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },

        })

        if (!recurring || recurring.deletedAt) {
            throw new NotFoundException("Recurring not found");
        }

        return recurring
    }

    async createRecurring(
        createRecurringDTO: CreateRecurringDTO
    ): Promise<RecurringDTO> {
        return await this.prisma.recurring.create({
            data: {
                type: createRecurringDTO.type,
                interval: createRecurringDTO.interval ?? 1,
                endDate: createRecurringDTO.endDate,
                taskId: createRecurringDTO.taskId,
                eventId: createRecurringDTO.eventId,
            },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },
        })
    }

    async updateRecurring(
        id: string,
        updateRecurringDTO: UpdateRecurringDTO
    ): Promise<RecurringDTO> {
        const recurring = await this.prisma.recurring.findUnique({
            where: { id }
        })

        if (!recurring || recurring.deletedAt)
            throw new NotFoundException("Recurring not found")

        return await this.prisma.recurring.update({
            where: { id },
            data: {
                ...(updateRecurringDTO.type !== undefined && {
                    type: updateRecurringDTO.type,
                }),
                ...(updateRecurringDTO.interval !== undefined && {
                    interval: updateRecurringDTO.interval,
                }),
                ...(updateRecurringDTO.endDate !== undefined && {
                    endDate: updateRecurringDTO.endDate,
                }),
                ...(updateRecurringDTO.taskId !== undefined && {
                    taskId: updateRecurringDTO.taskId,
                }),
                ...(updateRecurringDTO.eventId !== undefined && {
                    eventId: updateRecurringDTO.eventId,
                }),
            },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },
        })
    }

    async deleteRecurring(
        id: string
    ): Promise<RecurringDTO> {
        const recurring = await this.prisma.recurring.findUnique({
            where: { id },
        })


        if (!recurring || recurring.deletedAt)
            throw new NotFoundException("Recurring not found")


        return await this.prisma.recurring.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },
        })

    }

    async filterRecurring(
        filters: FilterRecurringDTO
    ): Promise<RecurringDTO[]> {
        return await this.prisma.recurring.findMany({
            where: {
                deletedAt: null,
                ...(filters.type && { type: filters.type }),
                ...(filters.taskId && { taskId: filters.taskId }),
                ...(filters.eventId && { eventId: filters.eventId }),
                ...(filters.endDate && { endDate: filters.endDate }),
            },
            include: {
                task: true,
                event: true,
                exceptions: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    }
}