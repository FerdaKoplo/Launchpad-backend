import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RecurringService } from "./recurring.service";
import { RecurringDTO } from "./dto/recurring.dto";
import { CreateRecurringDTO } from "./dto/create-recurring.dto";
import { UpdateRecurringDTO } from "./dto/update-recurring.dto";
import { FilterRecurringDTO } from "./dto/filter-recurring.dto";

@Controller()
export class RecurringController {
  constructor(private readonly recurringService: RecurringService) { }

  @Get()
  async getRecurringFromTaskandEvent(
    @Query('taskId') taskId: string,
    @Query('eventId') eventId: string
  ): Promise<RecurringDTO[]> {
    return this.recurringService.getRecurrings(taskId, eventId)
  }

  @Get(':id')
  async getDetailRecurring(
    @Param('id') id: string
  ): Promise<RecurringDTO> {
    return this.recurringService.getDetailRecurring(id)
  }

  @Post()
  async createRecurring(
    @Body() createRecurringDTO: CreateRecurringDTO
  ): Promise<RecurringDTO> {
    return this.recurringService.createRecurring(createRecurringDTO)
  }

  @Patch(':id')
  async updateRecurring(
    @Param('id') id: string,
    @Body() updateRecurringDTO: UpdateRecurringDTO
  ): Promise<RecurringDTO> {
    return this.recurringService.updateRecurring(id, updateRecurringDTO)
  }

  @Delete(':id')
  async deleteRecurring(
    @Param('id') id: string

  ): Promise<RecurringDTO> {
    return this.recurringService.deleteRecurring(id)
  }

  @Get('filter')
  async filterRecurring(
    @Query() filters: FilterRecurringDTO
  ): Promise<RecurringDTO[]> {
    return this.recurringService.filterRecurring(filters)
  }

}
