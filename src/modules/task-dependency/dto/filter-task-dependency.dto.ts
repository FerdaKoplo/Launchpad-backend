import { IsOptional, IsUUID } from "class-validator";

export class FilterTaskDependencyDTO {
    @IsOptional()
    @IsUUID()
    taskId?: string

    @IsOptional()
    @IsUUID()
    dependsOn?: string

    @IsOptional()
    @IsUUID()
    workspaceId?: string
}