import { Module } from "@nestjs/common";
import { TaskDependencyController } from "./task-dependency.controller";
import { TaskDependencyService } from "./task-dependency.service";

@Module({
    controllers : [TaskDependencyController],
    providers : [TaskDependencyService],
    exports : [TaskDependencyService]
})

export class TaskDependencyModule {}