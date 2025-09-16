import { IsEnum, IsOptional, IsString } from "class-validator";
import { Theme } from "prisma/generated/prisma";

export class UpdateUserProfileDTO {
    @IsOptional()
    @IsString()
    avatar? : string

    @IsOptional()
    @IsEnum(Theme)
    theme? : Theme
}