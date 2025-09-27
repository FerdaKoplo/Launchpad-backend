import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class FilterActivityLogDTO {
  @IsUUID()
  @IsOptional()
  userId: string


  @IsUUID()
  @IsOptional()
  workspaceId: string

  @IsString()
  @IsOptional()
  action: string

  @IsDateString()
  @IsOptional()
  dateFrom?: string


  @IsDateString()
  @IsOptional()
  dateTo?: string

}

