import { IsEnum, IsOptional } from "class-validator";
import { Role } from "../../../../prisma/generated/prisma";


export class UpdateWorkspaceMemberDTO {
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}