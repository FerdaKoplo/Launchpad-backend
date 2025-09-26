import { IsNotEmpty, IsString } from "class-validator"

export class UpdateTaskDependencyDTO {
    @IsString()
    @IsNotEmpty()
    dependsOn: string
}