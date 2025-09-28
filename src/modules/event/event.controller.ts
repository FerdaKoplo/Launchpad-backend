import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventDTO } from "./dto/event.dto";
import { CreateEventDTO } from "./dto/create-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { FilterEventDTO } from "./dto/filter-event.dto";

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async getEventsFromWorkspace(
    @Query('workspaceId') workspaceId: string
  ): Promise<EventDTO[]> {
    return this.eventService.getEvents(workspaceId)
  }

  @Get(':id')
  async getDetailEvent(
    @Param('id') id: string
  ): Promise<EventDTO> {
    return this.eventService.getDetailEvent(id)
  }

  @Post()
  async createEvent(
    @Body() createEventDTO: CreateEventDTO
  ): Promise<EventDTO> {
    return this.eventService.createEvent(createEventDTO)
  }

  @Patch(':id')
  async UpdateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDTO
  ): Promise<EventDTO> {
    return this.eventService.updateEvent(id, updateEventDto)
  }

  @Delete(':id')
  async deleteEvent(
    @Param('id') id: string,
  ): Promise<EventDTO> {
    return this.eventService.deleteEvent(id)
  }

  @Get('filter')
  async filterEvent(
    @Query() filters: FilterEventDTO
  ): Promise<EventDTO[]> {
    return this.eventService.eventFilter(filters)
  }
}
