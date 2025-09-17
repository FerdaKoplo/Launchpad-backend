import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { DefaultView, Theme } from "../../../../prisma/generated/prisma";


export class UpdateWorkspaceSettingDTO {
    @IsEnum(DefaultView)
    @IsOptional()
    defaultView?: DefaultView;

    @IsBoolean()
    @IsOptional()
    allowGuests?: boolean;

    @IsEnum(Theme)
    @IsOptional()
    theme?: Theme;
}