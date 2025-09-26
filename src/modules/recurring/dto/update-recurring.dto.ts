import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator"
import { RecurringType } from "../../../../prisma/generated/prisma"

export class UpdateRecurringDTO {
    @IsEnum(RecurringType)
    type: RecurringType

    @IsInt()
    @Min(1)
    interval: number = 1

    @IsOptional()
    @IsDateString()
    endDate?: string

    @IsOptional()
    @IsString()
    taskId?: string


    @IsOptional()
    @IsString()
    eventId?: string
}