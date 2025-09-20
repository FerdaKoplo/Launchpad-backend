import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateSubTaskDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsUUID()
    @IsNotEmpty()
    taskId: string

    @IsBoolean()
    @IsOptional()
    completed : boolean
}