import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateEventDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsUUID()
    @IsNotEmpty()
    workspaceId: string

    @IsDateString()
    @IsNotEmpty()
    date: Date

}