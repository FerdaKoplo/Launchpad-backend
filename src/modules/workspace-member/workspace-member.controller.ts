import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { WorkspaceMemberServie } from "./workspace-member.service";
import { UpdateWorkspaceMemberDTO } from "./dto/update-workspace-member.dto";
import { CreateWorkspaceMemberDTO } from "./dto/create-workspace-member.dto";
import { WorkspaceMemberFilter } from "./dto/workspace-member-filter.dto";

@Controller('workspace-member')
export class WorkspaceMemberController {
    constructor(private readonly workspaceMemberService: WorkspaceMemberServie) { }

    @Get("workspace/:workspaceId")
    async getWorkspaceMembers(@Param("workspaceId") workspaceId: string) {
        return this.workspaceMemberService.getWorkspaceMember(workspaceId)
    }

    @Get(":id")
    async getWorkspaceMemberById(@Param("id") id: string) {
        return this.workspaceMemberService.getWorkspaceMemberById(id)
    }

    @Post()
    async createWorkspaceMember(@Body() dto: CreateWorkspaceMemberDTO) {
        return this.workspaceMemberService.createWorkspaceMember(dto);
    }

    @Patch(":id")
    async updateWorkspaceMember(
        @Param("id") id: string,
        @Body() dto: UpdateWorkspaceMemberDTO
    ) {
        return this.workspaceMemberService.updateWorkspaceMember(id, dto)
    }

    @Delete(":id")
    async deleteWorkspaceMember(@Param("id") id: string) {
        return this.workspaceMemberService.deleteWorkspaceMember(id)
    }

    @Get("search")
    async searchWorkspaceMembers(@Query() filters: WorkspaceMemberFilter) {
        return this.workspaceMemberService.searchWorkspaceMembers(filters)
    }
}