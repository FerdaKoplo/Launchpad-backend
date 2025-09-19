import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "../../../../prisma/generated/prisma";

export class UpdateTaskDTO {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority

    @IsDateString()
    @IsOptional()
    dueDate?: Date

    @IsString()
    @IsOptional()
    workspaceId?: string
}