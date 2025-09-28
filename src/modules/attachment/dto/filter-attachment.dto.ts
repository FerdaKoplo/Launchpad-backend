import { IsOptional, IsString } from "class-validator";

export class FilterAttachmentDTO {
  @IsOptional()
  @IsString()
  taskId?: string

  @IsOptional()
  @IsString()
  noteId?: string

  @IsOptional()
  @IsString()
  uploadedBy: string
}
