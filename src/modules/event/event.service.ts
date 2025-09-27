import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EventDTO } from "./dto/event.dto";
import { CreateEventDTO } from "./dto/create-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { FilterEventDTO } from "./dto/filter-event.dto";

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) { }

    async getEvents(
        workspaceId: string
    ): Promise<EventDTO[]> {
        return await this.prisma.event.findMany({
            where: {
                ...(workspaceId && { workspaceId }),
                deletedAt: null
            },
            include: {
                workspace: true,
                recurring: true
            }
        })
    }

    async getDetailEvent(
        id: string
    ): Promise<EventDTO> {
        const event = await this.prisma.event.findUnique({
            where: {
                id
            },
            include: {
                workspace: true,
                recurring: true
            }
        })

        if (!event || event.deletedAt)
            throw new NotFoundException("Event not found");

        return event
    }

    async createEvent(
        createEventDTO: CreateEventDTO
    ): Promise<EventDTO> {
        return await this.prisma.event.create({
            data: {
                title: createEventDTO.title,
                date: createEventDTO.date,
                workspaceId: createEventDTO.workspaceId
            },
            include: {
                workspace: true,
                recurring: true
            }
        })
    }


    async updateEvent(
        id: string,
        updateEventDTO: UpdateEventDTO
    ): Promise<EventDTO> {
        const event = await this.prisma.event.findUnique({
            where: {
                id
            }
        })

        if (!event || event.deletedAt)
            throw new NotFoundException("Event not found")

        return await this.prisma.event.update({
            where: {
                id
            },

            data: {
                ...(updateEventDTO.title !== undefined && {
                    title: updateEventDTO.title,
                }),
                ...(updateEventDTO.date !== undefined && {
                    date: updateEventDTO.date,
                }),
                ...(updateEventDTO.workspaceId !== undefined && {
                    workspaceId: updateEventDTO.workspaceId,
                })
            },
            include: {
                workspace: true,
                recurring: true
            }
        })
    }

    async deleteEvent(
        id: string
    ): Promise<EventDTO> {
        const event = await this.prisma.event.findUnique({
            where: {
                id
            }
        })

        if (!event || event.deletedAt)
            throw new NotFoundException("Event not found")

        return await this.prisma.event.update({
            where : {
                id
            },
            data : {
                deletedAt : new Date()
            },
            include : {
                workspace : true,
                recurring : true
            }
        })
    }


    async eventFilter(
        filters : FilterEventDTO
    ) : Promise<EventDTO[]> {
        return await this.prisma.event.findMany({
            where : {
                deletedAt : null,
                ...(filters.type && { type: filters.type }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.workspaceId && { workspaceId: filters.workspaceId }),
            },

            include : {
                workspace : true,
                recurring : true
            },

            orderBy : {
                createdAt : "desc"
            }
        })
    }
}
