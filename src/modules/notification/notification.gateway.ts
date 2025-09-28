import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Notification } from "../../../prisma/generated/prisma/";
import { Server } from "socket.io"

@WebSocketGateway(80, { namespace: 'notifications', cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server

  sendNotification(userId: string, notification: Notification) {
    this.server.to(userId).emit('notifications', notification)
  }
}
