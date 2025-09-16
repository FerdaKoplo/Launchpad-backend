import { IsOptional, IsString } from "class-validator";

export class UpdateWorkspaceDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    deletedAt?: Date | null;
}