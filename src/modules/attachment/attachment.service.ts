import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AttachmentDTO } from "./dto/attachment.dto";
import { CreateAttachmentDTO } from "./dto/create-attachment.dto";
import { create } from "domain";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { FilterAttachmentDTO } from "./dto/filter-attachment.dto";

@Injectable()
export class AttachmentService {
  constructor(private readonly prisma: PrismaService) { }

  async getAttachments(
    taskId?: string,
    noteId?: string
  ): Promise<AttachmentDTO[]> {
    return await this.prisma.attachment.findMany({
      where: {
        deletedAt: null,
        ...(taskId && { taskId }),
        ...(noteId && { noteId })
      },
      include: {
        user: true,
        task: true,
        note: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  }

  async getDetailAttachment(
    id: string
  ): Promise<AttachmentDTO> {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id
      },
      include: {
        user: true,
        task: true,
        note: true
      }
    })

    if (!attachment || attachment.deletedAt)
      throw new NotFoundException("Attachment Not Found")

    return attachment
  }

  async createAttachment(
    uploadedFile: Express.Multer.File,
    createAttachmentDTO: CreateAttachmentDTO,
    userId: string
  ): Promise<AttachmentDTO> {
    return await this.prisma.attachment.create({
      data: {
        filename: createAttachmentDTO.filename,
        filetype: createAttachmentDTO.filetype,
        url: `/storage/${uploadedFile.filename}`,
        uploadedBy: userId,
        taskId: createAttachmentDTO.taskId,
        noteId: createAttachmentDTO.noteId
      },
      include: {
        user: true,
        task: true,
        note: true
      }
    })
  }

  async deleteAttachment(
    id: string
  ): Promise<AttachmentDTO> {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id
      }
    })

    if (!attachment || attachment.deletedAt)
      throw new NotFoundException('Attachment Not Found')

    return await this.prisma.attachment.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })
  }

  async filterAttachment(
    filters: FilterAttachmentDTO
  ): Promise<AttachmentDTO[]> {
    return await this.prisma.attachment.findMany({
      where: {
        deletedAt: null,
        ...(filters.taskId && { taskId: filters.taskId }),
        ...(filters.noteId && { noteId: filters.noteId }),
        ...(filters.uploadedBy && { uploadedBy: filters.uploadedBy }),
      },
      include: {
        user: true,
        note: true,
        task: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

  }
}
