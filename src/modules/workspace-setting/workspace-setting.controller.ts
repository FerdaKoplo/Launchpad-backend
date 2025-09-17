import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { WorkspaceSettingService } from "./workspace-setting.service";
import { CreateWorkspaceSettingDTO } from "./dto/create-workspace-setting.dto";
import { UpdateWorkspaceSettingDTO } from "./dto/update-workspace-setting.dto";
import { WorkspaceSettingFilterDTO } from "./dto/workspace-setting-filter.dto";


@Controller('workspace-setting')
export class WorkspaceSettingController {
    constructor(private readonly workspaceSettingService: WorkspaceSettingService) { }

    @Get('workspace-setting')
    async getAllWorkspaceSettings() {
        return this.workspaceSettingService.getWorkspaceSettings()
    }

    @Get('id')
    async getDetailWorkspaceSetting(
        @Param('id') id: string
    ) {
        return this.workspaceSettingService.getDetailWorkspaceSetting(id)
    }

    @Post('sorkspace-setting')
    async createWorkspaceSetting(
        @Body() createWorkspaceSetting: CreateWorkspaceSettingDTO
    ) {
        return this.workspaceSettingService.createWorkspaceSetting(createWorkspaceSetting)
    }

    @Patch(':id')
    async updateWorkspaceSetting(
        @Param('id') id: string,
        @Body() updateSelectedWorkspaceSetting: UpdateWorkspaceSettingDTO
    ) {
        return this.workspaceSettingService.updateWorkspaceSetting(id, updateSelectedWorkspaceSetting)
    }

    @Delete(':id')
    async deleteWorkspaceSetting(
        @Param('id') id: string
    ) {
        return this.workspaceSettingService.deleteWorkspaceSetting(id)
    }

    @Get('search')
    async searchWorkspaceSetting(
        @Query() filter: WorkspaceSettingFilterDTO
    ) {
        return this.workspaceSettingService.searchWorkspaceSetting(filter)
    }
}