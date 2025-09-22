import { IsEnum, IsOptional, IsString } from "class-validator";


export enum CommentSort {
    NEWEST = "NEWEST",
    OLDEST = "OLDEST",
    LAST_24H = "LAST_24H",
}


export class FilterCommentDTO {
    @IsOptional()
    @IsString()
    authorId?: string

    @IsOptional()
    @IsString()
    taskId?: string

    @IsOptional()
    @IsString()
    noteId?: string

    @IsOptional()
    @IsEnum(CommentSort)
    sort?: CommentSort
}