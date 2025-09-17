import { Module } from "@nestjs/common";
import { WorkspaceSettingController } from "./workspace-setting.controller";
import { WorkspaceSettingService } from "./workspace-setting.service";

@Module({
    controllers : [WorkspaceSettingController],
    providers : [WorkspaceSettingService],
    exports : [WorkspaceSettingService]
})

export class WorkspaceSettingModule {}