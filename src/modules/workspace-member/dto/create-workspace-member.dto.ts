import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../../../../prisma/generated/prisma";

export class CreateWorkspaceMemberDTO {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    workspaceId: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}