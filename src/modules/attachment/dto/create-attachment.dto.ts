import { IsEnum, IsOptional, IsString } from "class-validator";
import { FileType } from "../../../../prisma/generated/prisma";

export class CreateAttachmentDTO {
  @IsOptional()
  @IsString()
  filename: string

  @IsOptional()
  @IsString()
  taskId?: string;

  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  @IsEnum(FileType)
  filetype?: FileType;
}
