import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDTO {
    @IsUUID()
    @IsNotEmpty()
    taskId: string

    @IsUUID()
    @IsNotEmpty()
    authorId: string

    @IsUUID()
    @IsNotEmpty()
    noteId: string

    @IsString()
    @IsOptional()
    content: string


}