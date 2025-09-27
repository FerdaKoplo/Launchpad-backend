import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateActivityLogDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  workspaceId: string

  @IsString()
  @IsNotEmpty()
  action: string
}
