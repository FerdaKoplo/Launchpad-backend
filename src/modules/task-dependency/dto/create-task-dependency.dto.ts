import { IsNotEmpty, IsString} from "class-validator";

export class CreateTaskDependencyDTO {
    @IsString()
    @IsNotEmpty()
    dependsOn : string
}