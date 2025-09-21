import { IsOptional, IsString } from "class-validator";

export class CreateCommentDTO {
    @IsString()
    @IsOptional()
    content : string
}