import { Module } from "@nestjs/common";
import { SubTaskController } from "./sub-tas.controller";
import { SubTaskService } from "./sub-task.service";

@Module({
    controllers : [SubTaskController],
    providers : [SubTaskService],
    exports : [SubTaskService]
})

export class SubTaskModule {}