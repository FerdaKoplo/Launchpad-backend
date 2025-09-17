import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DefaultView, Theme } from "../../../../prisma/generated/prisma";

export class CreateWorkspaceSettingDTO {
    @IsString()
    @IsNotEmpty()
    workspaceId: string

    @IsEnum(DefaultView)
    @IsOptional()
    defaultView? : DefaultView = DefaultView.BOARD

    @IsBoolean()
    @IsOptional()
    allowGuests? : boolean = false

    @IsEnum(Theme)
    @IsOptional()
    theme? : Theme = Theme.LIGHT
}