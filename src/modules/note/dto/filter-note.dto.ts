import { IsOptional, IsString, IsUUID } from "class-validator";

export class FilterNoteDTO {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    content?: string

    @IsOptional()
    @IsUUID()
    workspaceId?: string
}