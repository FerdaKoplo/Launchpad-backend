import { IsOptional, IsString } from "class-validator";

export class UpdateTagDTO {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    color?: string

    @IsString()
    @IsOptional()
    workspaceId?: string
}