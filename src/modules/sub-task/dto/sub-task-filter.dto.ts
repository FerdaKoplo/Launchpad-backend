import { IsBoolean, IsOptional, IsUUID } from "class-validator";

export class SubTaskFilterDTO {
    @IsOptional()
    @IsUUID()
    taskId?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean
}