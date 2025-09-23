import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateTaskDependencyDTO {
    @IsUUID()
    @IsString()
    taskId: string

    @IsString()
    @IsNotEmpty()
    dependsOn: string
}