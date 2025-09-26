import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"
import { RecurringType } from "../../../../prisma/generated/prisma"

export class FilterRecurringDTO {
    @IsOptional()
    @IsEnum(RecurringType)
    type?: RecurringType

    @IsOptional()
    @IsString()
    taskId?: string

    @IsOptional()
    @IsString()
    eventId?: string

    @IsOptional()
    @IsDateString()
    startDate?: string

    @IsOptional()
    @IsDateString()
    endDate?: string
}