import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDTO } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDTO } from "./dto/update-workspace.dto";
import { WorkspaceFilterDTO } from "./dto/workspace-filter.dto";

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Get()
  async getAllWorkspaces() {
    return this.workspaceService.getWorkspaces()
  }

  @Get(':id')
  async getDetailWorkspace(@Param('id') id: string) {
    return this.workspaceService.getDetailWorkspace(id)
  }

  @Post()
  async createWorkspace(
    @Body() createWorkspace: CreateWorkspaceDTO) {
    return this.workspaceService.createWorkspace(createWorkspace)
  }

  @Patch(':id')
  async updateWorkspace(
    @Param('id') id: string,
    @Body() updateSelectedWorkspace: UpdateWorkspaceDTO
  ) {
    return this.workspaceService.updateWorkspace(id, updateSelectedWorkspace)
  }

  @Delete(":id")
  async deleteWorkspace(@Param("id") id: string) {
    return this.workspaceService.deleteWorkpsace(id)
  }


  @Get("search")
  async filterWorkspace(@Query() filter: WorkspaceFilterDTO) {
    return this.workspaceService.filterWorkspace(filter)
  }

}
