import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AttachmentService } from "./attachment.service";
import { AttachmentDTO } from "./dto/attachment.dto";
import { CreateAttachmentDTO } from "./dto/create-attachment.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { UserPayload } from "src/types/user.type";
import { FilterAttachmentDTO } from "./dto/filter-attachment.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) { }
  @Get()
  async getAttachments(
    @Query() taskId: string,
    @Query() noteId: string
  ): Promise<AttachmentDTO[]> {
    return this.attachmentService.getAttachments(taskId, noteId)

  }

  @Get(':id')
  async getDetailAttachment(
    id: string
  ): Promise<AttachmentDTO> {
    return this.attachmentService.getDetailAttachment(id)

  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAttachment(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @Body() createAttachmentDTO: CreateAttachmentDTO,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.attachmentService.createAttachment(uploadedFile, createAttachmentDTO, currentUser.id)
  }


  @Delete(':id')
  async deleteAttachment(
    @Param() id: string
  ): Promise<AttachmentDTO> {
    return this.attachmentService.deleteAttachment(id)
  }

  @Get('filter')
  async filterAttachment(
    @Query() filters: FilterAttachmentDTO
  ): Promise<AttachmentDTO[]> {
    return this.attachmentService.filterAttachment(filters)

  }
}
