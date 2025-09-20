import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateSubTaskDTO {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean
}