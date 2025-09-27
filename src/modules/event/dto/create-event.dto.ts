import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    title : string

    @IsUUID()
    @IsNotEmpty()
    workspaceId : string

    @IsDateString()
    @IsNotEmpty()
    date : Date
}