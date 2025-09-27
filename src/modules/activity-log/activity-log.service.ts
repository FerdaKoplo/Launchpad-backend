
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ActivityLogDTO } from "./dto/activity-log.dto";
import { CreateActivityLogDTO } from "./dto/create-activity-log.dto";
import { FilterActivityLogDTO } from "./dto/filter-activity-log.dto";


@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) { }

  async getActivityLogs(
    userId: string,
    workspaceId: string
  ): Promise<ActivityLogDTO[]> {
    return await this.prisma.activityLog.findMany({
      where: {
        ...(userId && { userId }),
        ...(workspaceId && { workspaceId }),
        deletedAt: null
      },
      include: {
        user: true,
        workspace: true
      }

    })

  }

  async getDetailActivityLog(
    id: string
  ): Promise<ActivityLogDTO> {

    const activityLog = await this.prisma.activityLog.findUnique({
      where: {
        id
      }
    })

    if (!activityLog || activityLog.deletedAt)
      throw new NotFoundException("activity log not found")

    return activityLog
  }

  async createActivityLog(
    createActivityLogDTO: CreateActivityLogDTO
  ): Promise<ActivityLogDTO> {
    return await this.prisma.activityLog.create({
      data: {
        userId: createActivityLogDTO.userId,
        workspaceId: createActivityLogDTO.workspaceId,
        action: createActivityLogDTO.action
      },
      include: {
        user: true,
        workspace: true
      }
    })
  }


  async filterActivityLog(
    filters: FilterActivityLogDTO
  ): Promise<ActivityLogDTO[]> {
    return await this.prisma.activityLog.findMany({
      where: {
        deletedAt: null,
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.workspaceId && { workspaceId: filters.workspaceId }),
        ...(filters.action && { action: { contains: filters.action, mode: "insensitive" } }),
        ...(filters.dateFrom || filters.dateTo
          ? {
            createdAt: {
              ...(filters.dateFrom && { gte: new Date(filters.dateFrom) }),
              ...(filters.dateTo && { lte: new Date(filters.dateTo) }),
            },
          }
          : {}),
      },
      include: {
        user: true,
        workspace: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}

