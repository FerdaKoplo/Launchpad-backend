import { IsDateString, IsString, IsUUID } from "class-validator"

export class UpdateRecurringExceptionDTO {
  @IsUUID()
  @IsString()
  recurringId: string

  @IsDateString()
  date: string
}
