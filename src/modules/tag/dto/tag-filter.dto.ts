import { IsOptional, IsString } from "class-validator";

export class TagFilterDTO {
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