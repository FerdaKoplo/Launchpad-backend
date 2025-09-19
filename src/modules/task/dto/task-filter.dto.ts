import { IsEnum, IsOptional, IsString } from "class-validator"
import { TaskPriority, TaskStatus } from "../../../../prisma/generated/prisma"

export class TaskFilterDTO {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority

    @IsOptional()
    @IsString()
    workspaceId?: string
}