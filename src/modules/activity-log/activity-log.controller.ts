import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLogDTO } from "./dto/activity-log.dto";
import { CreateActivityLogDTO } from "./dto/create-activity-log.dto";
import { FilterActivityLogDTO } from "./dto/filter-activity-log.dto";

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) { }

  @Get()
  async getActivityLogsUSer(
    @Query('userId') userId: string,
    @Query('workspaceId') workspaceId: string
  ): Promise<ActivityLogDTO[]> {
    return this.activityLogService.getActivityLogs(userId, workspaceId)
  }

  @Get(':id')
  async getDetailActivityLog(
    @Param('id') id: string
  ): Promise<ActivityLogDTO> {
    return this.activityLogService.getDetailActivityLog(id)
  }

  @Post()
  async createActivityLog(
    @Body() createActivityLogDTO: CreateActivityLogDTO
  ): Promise<ActivityLogDTO> {
    return this.activityLogService.createActivityLog(createActivityLogDTO)
  }

  @Get('filter')
  async filterActivityLog(
    @Query() filters: FilterActivityLogDTO
  ): Promise<ActivityLogDTO[]> {
    return this.activityLogService.filterActivityLog(filters)
  }

}
