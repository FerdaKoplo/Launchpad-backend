import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class FilterNotificationDTO {
  @IsOptional()
  @IsUUID()
  userId: string

  @IsOptional()
  @IsBoolean()
  read?: boolean

  @IsOptional()
  @IsString()
  message: string

  @IsOptional()
  @IsDateString()
  dateFrom: string

  @IsOptional()
  @IsDateString()
  dateTo: string
}

