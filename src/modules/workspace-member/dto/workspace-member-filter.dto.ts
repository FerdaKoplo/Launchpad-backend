import { IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../../../../prisma/generated/prisma";

export class WorkspaceMemberFilter {
    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    workspaceId?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}