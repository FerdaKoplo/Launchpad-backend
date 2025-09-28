import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateNotificationDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  message: string
}

