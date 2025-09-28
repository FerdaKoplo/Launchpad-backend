import { Injectable, NotFoundException } from "@nestjs/common"; import { PrismaService } from "src/prisma/prisma.service";
import { CommentDTO } from "./dto/comment.dto";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { create } from "domain";
import { UpdateCommentDTO } from "./dto/update-comment.dto";
import { CommentSort, FilterCommentDTO } from "./dto/filter-comment.dto";
import { PaginationCommentDTO } from "./dto/pagination-comment.dto";


@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllComments(
    taskId: string,
    noteId: string,
    authorId: string
  ): Promise<CommentDTO[]> {
    return await this.prisma.comment.findMany({
      where: {
        authorId,
        ...(noteId && { noteId }),
        ...(taskId && { taskId }),
        deletedAt: null
      },
      include: {
        task: true,
        author: true,
        note: true,
      }
    })
  }


  async getDetailComment(
    id: string,
  ): Promise<CommentDTO> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id
      },
      include: {
        task: true,
        author: true,
        note: true,
        mentions: true
      }
    })

    if (!comment || comment.deletedAt)
      throw new NotFoundException("Comment Not Found")

    return comment
  }

  async createComment(
    createCommentDTO: CreateCommentDTO
  ): Promise<CommentDTO> {
    return await this.prisma.comment.create({
      data: {
        authorId: createCommentDTO.authorId,
        taskId: createCommentDTO.taskId,
        noteId: createCommentDTO.noteId,
        content: createCommentDTO.content
      },
      include: {
        task: true,
        note: true,
        author: true,
        mentions: true
      }
    })
  }

  async updateComment(
    id: string,
    updateCommentDTO: UpdateCommentDTO
  ): Promise<CommentDTO> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id
      }
    })

    if (!comment || comment.deletedAt)
      throw new NotFoundException("Comment Not Found")

    return await this.prisma.comment.update({
      where: {
        id
      },
      data: {
        ...(updateCommentDTO.content !== undefined && {
          content: updateCommentDTO.content,
        })
      },
    })
  }


  async deleteComment(
    id: string
  ): Promise<CommentDTO> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id
      }
    })

    if (!comment || comment.deletedAt)
      throw new NotFoundException("Comment Not Found")

    return await this.prisma.comment.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      },
      include: {
        author: true,
        mentions: true,
        note: true,
        task: true
      }
    })
  }

  async filterComment(
    filters: FilterCommentDTO,
    pagination: PaginationCommentDTO
  ): Promise<CommentDTO[]> {

    const skip = ((pagination?.page ?? 1) - 1) * (pagination?.limit ?? 10)
    const take = pagination?.limit ?? 10

    return await this.prisma.comment.findMany({
      where: {
        deletedAt: null,
        ...(filters.authorId && { authorId: filters.authorId }),
        ...(filters.taskId && { taskId: filters.taskId }),
        ...(filters.noteId && { noteId: filters.noteId }),
        ...(filters.sort === CommentSort.LAST_24H && {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        })
      },
      include: {
        author: true,
        task: true,
        mentions: true,
        note: true
      },
      orderBy: (() => {
        switch (filters.sort) {
          case CommentSort.OLDEST:
            return { createdAt: 'asc' };
          case CommentSort.LAST_24H:
            return { createdAt: 'desc' };
          default:
            return { createdAt: 'desc' };
        }
      })(),
      skip,
      take
    })
  }
}
