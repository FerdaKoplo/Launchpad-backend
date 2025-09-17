import { IsOptional, IsString } from "class-validator";

export class WorkspaceFilterDTO {
    @IsOptional()
    @IsString()
    search?: string
    
    @IsOptional()
    includeDeleted?: boolean
}