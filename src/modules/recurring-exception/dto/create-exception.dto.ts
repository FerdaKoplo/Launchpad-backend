import { IsDateString, IsString, IsUUID } from "class-validator";

export class CreateRecurringExceptionDTO {
  @IsUUID()
  @IsString()
  recurringId: string

  @IsDateString()
  date: string
}
