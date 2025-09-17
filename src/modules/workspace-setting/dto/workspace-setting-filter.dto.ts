import { IsBoolean, IsOptional, IsString } from "class-validator";

export class WorkspaceSettingFilterDTO {
    @IsOptional()
    @IsBoolean()
    allowGuests?: boolean

    @IsOptional()
    @IsString()
    theme?: string

    @IsOptional()
    @IsString()
    defaultView?: string
}