import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationsDTO } from "./dto/notification.dto";
import { CreateNotificationDTO } from "./dto/create-notification.dto";
import { FilterNotificationDTO } from "./dto/filter-notification.dto";

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get()
  async getNotifications(
    @Param('userId') userId: string

  ): Promise<NotificationsDTO[]> {
    return this.notificationService.getNotifiction(userId)
  }

  @Post()
  async createNotification(
    @Body() createNotificationDTO: CreateNotificationDTO
  ): Promise<NotificationsDTO> {
    return this.notificationService.createNotification(createNotificationDTO)

  }

  @Get('filter')
  async filterNotification(
    @Query() filters: FilterNotificationDTO
  ): Promise<NotificationsDTO[]> {
    return this.notificationService.filterNotifications(filters)
  }
}
