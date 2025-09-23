import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTaskDependencyDTO {
    @IsUUID()
    @IsString()
    taskId : string

    @IsString()
    @IsNotEmpty()
    dependsOn : string
}