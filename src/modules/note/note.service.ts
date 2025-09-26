import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NoteDTO } from "./dto/note.dto";
import { CreateNoteDTO } from "./dto/create-note.dto";
import { UpdateNoteDTO } from "./dto/update-note.dto";
import { FilterNoteDTO } from "./dto/filter-note.dto";

@Injectable()
export class NoteService {
    constructor(private readonly prisma: PrismaService) { }

    async getNotes(
        workspaceId: string
    ): Promise<NoteDTO[]> {
        return await this.prisma.note.findMany({
            where: {
                ...(workspaceId && { workspaceId }),
                deletedAt: null
            },

            include: {
                attachments: true,
                workspace: true,
                comments: true
            }
        })
    }

    async getDetailNotes(
        id: string
    ): Promise<NoteDTO> {
        const note = await this.prisma.note.findUnique({
            where: {
                id
            },
            include: {
                workspace: true,
                attachments: true,
                comments: true
            }
        })

        if (!note || note.deletedAt)
            throw new NotFoundException("Note not found")

        return note
    }

    async createNote(
        createNoteDTO: CreateNoteDTO
    ): Promise<NoteDTO> {
        return await this.prisma.note.create({
            data: {
                title: createNoteDTO.title,
                content: createNoteDTO.content,
                workspaceId: createNoteDTO.workspaceId
            },

            include: {
                workspace: true,
                attachments: true,
                comments: true
            }
        })
    }

    async updateNote(
        id: string,
        updateNoteDTO: UpdateNoteDTO
    ): Promise<NoteDTO> {
        return await this.prisma.note.update({
            where: {
                id
            },
            data: {
                ...(updateNoteDTO.title !== undefined && { title: updateNoteDTO.title }),
                ...(updateNoteDTO.content !== undefined && { content: updateNoteDTO.content }),
                ...(updateNoteDTO.workspaceId !== undefined && { workspaceId: updateNoteDTO.workspaceId }),
            },
            include: {
                workspace: true,
                attachments: true,
                comments: true
            }
        })
    }

    async deleteNote(
        id: string
    ): Promise<NoteDTO> {
        return await this.prisma.note.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date(),
            },
        })
    }

    async filterNotes(
        filterNoteDTO: FilterNoteDTO
    ): Promise<NoteDTO[]> {
        return await this.prisma.note.findMany({
            where: {
                deletedAt: null, 
                ...(filterNoteDTO.title && {
                    title: { contains: filterNoteDTO.title, mode: "insensitive" }
                }),
                ...(filterNoteDTO.content && {
                    content: { contains: filterNoteDTO.content, mode: "insensitive" }
                }),
                ...(filterNoteDTO.workspaceId && {
                    workspaceId: filterNoteDTO.workspaceId
                })
            },
            include: {
                attachments: true,
                workspace: true,
                comments: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

}