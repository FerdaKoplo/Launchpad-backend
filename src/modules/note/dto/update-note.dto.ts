import { IsNotEmpty, IsString, IsUUID } from "class-validator"


export class UpdateNoteDTO {
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


