import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentDTO } from "./dto/comment.dto";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { UpdateCommentDTO } from "./dto/update-comment.dto";
import { FilterCommentDTO } from "./dto/filter-comment.dto";
import { PaginationCommentDTO } from "./dto/pagination-comment.dto";


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get()
  async getComments(
    @Query('taskId') taskId: string,
    @Query('noteId') noteId: string,
    @Query('authorId') authorId: string
  ): Promise<CommentDTO[]> {
    return this.commentService.getAllComments(taskId, noteId, authorId)
  }

  @Get(':id')
  async getDetailComment(
    @Param('id') id: string
  ): Promise<CommentDTO> {
    return this.commentService.getDetailComment(id)
  }

  @Post()
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO
  ): Promise<CommentDTO> {
    return this.commentService.createComment(createCommentDTO)
  }

  @Patch(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDTO: UpdateCommentDTO
  ): Promise<CommentDTO> {
    return this.commentService.updateComment(id, updateCommentDTO)
  }

  @Delete(':id')
  async deleteComment(
    @Param('id') id: string
  ) {
    return this.commentService.deleteComment(id)
  }

  @Get('filter')
  async filterComment(
    @Query() filters: FilterCommentDTO,
    @Query() pagination: PaginationCommentDTO
  ) {
    return this.commentService.filterComment(filters, pagination)
  }
}
