import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWorkspaceDTO {
    @IsString()
    @IsNotEmpty()
    name : string

    @IsOptional()
    deletedAt? : Date | null
}