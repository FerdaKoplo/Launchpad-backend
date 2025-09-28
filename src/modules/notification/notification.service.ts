import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationGateway } from "./notification.gateway";
import { CreateNotificationDTO } from "./dto/create-notification.dto";
import { NotificationsDTO } from "./dto/notification.dto";
import { FilterNotificationDTO } from "./dto/filter-notification.dto";


@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway
  ) { }


  async createNotification(
    createNotificationDTO: CreateNotificationDTO
  ): Promise<NotificationsDTO> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: createNotificationDTO.userId,
        message: createNotificationDTO.message
      },
      include: {
        user: true
      }
    })
    this.notificationGateway.sendNotification(notification.userId, notification)

    return notification
  }

  async getNotifiction(
    userId: string
  ): Promise<NotificationsDTO[]> {
    return await this.prisma.notification.findMany({
      where: {
        ...(userId && { userId }),
        deletedAt: null
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  }


  async filterNotifications(filters: FilterNotificationDTO)
    : Promise<NotificationsDTO[]> {
    return this.prisma.notification.findMany({
      where: {
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.read !== undefined && { read: filters.read }),
        ...(filters.message && { message: { contains: filters.message, mode: "insensitive" } }),
        ...(filters.dateFrom && { createdAt: { gte: new Date(filters.dateFrom) } }),
        ...(filters.dateTo && { createdAt: { lte: new Date(filters.dateTo) } }),
        deletedAt: null,
      },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }


}
