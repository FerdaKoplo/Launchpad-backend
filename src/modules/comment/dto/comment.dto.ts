export class CommentDTO {
    id : string
    content : string
    author : string
    taskId : string
    noteId : string
    createdAt : Date
    updatedAt : Date
    deletedAt : Date | null   
}