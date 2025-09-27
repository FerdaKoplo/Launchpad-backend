import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsUUID()
  @IsNotEmpty()
  workspaceId: string
}
