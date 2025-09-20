import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "../../../../prisma/generated/prisma";

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string
    
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus = TaskStatus.TODO

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority = TaskPriority.MEDIUM

    @IsDateString()
    @IsOptional()
    dueDate?: Date

    @IsString()
    @IsOptional()
    recurring?: string

    @IsString()
    @IsNotEmpty()
    workspaceId: string
}