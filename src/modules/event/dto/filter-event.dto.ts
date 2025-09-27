import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { RecurringType } from "prisma/generated/prisma";

export class FilterEventDTO {

    @IsOptional()
    @IsString()

    @IsOptional()
    @IsDateString()
    startDate?: string

    @IsOptional()
    @IsDateString()
    endDate?: string

    @IsOptional()
    @IsEnum(RecurringType)
    type?: RecurringType
}