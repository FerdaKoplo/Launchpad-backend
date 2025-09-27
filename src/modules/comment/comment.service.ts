import { Injectable } from "@nestjs/common"; import { PrismaService } from "src/prisma/prisma.service";
import { CommentDTO } from "./dto/comment.dto";


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


  // async getDetailComment(
  //     id: string,
  //     taskId: string,
  //     noteId: string,
  //     authorId: string

  // ) : Promise<CommentDTO> {

  // }
}
