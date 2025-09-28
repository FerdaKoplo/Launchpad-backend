import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RecurringExceptionService } from "./recurring-exception.service";
import { RecurringExceptionDTO } from "./dto/recurring-exception.dto";
import { CreateRecurringExceptionDTO } from "./dto/create-exception.dto";
import { UpdateRecurringExceptionDTO } from "./dto/update-recurring-exception.dto";

@Controller('recurring-exception')
export class RecurringExceptionController {
  constructor(private readonly recurringExceptionService: RecurringExceptionService) { }

  @Get()
  async getRecurringExceptionByRecurring(
    @Query('recurringId') recurringId: string
  ): Promise<RecurringExceptionDTO[]> {
    return this.recurringExceptionService.getRecurringException(recurringId)
  }

  @Post()
  async createRecurringExceptionByRecurring(
    @Body() createRecurringExceptionDTO: CreateRecurringExceptionDTO
  ): Promise<RecurringExceptionDTO> {
    return this.recurringExceptionService.createRecurringException(createRecurringExceptionDTO)

  }

  @Patch(':id')
  async updateRecurringExceptionByRecurring(
    @Param('id') id: string,
    @Body() updateRecurringExceptionDTO: UpdateRecurringExceptionDTO
  ): Promise<RecurringExceptionDTO> {
    return this.recurringExceptionService.updateRecurringException(id, updateRecurringExceptionDTO)
  }

  @Delete(':id')
  async deleteRecurringExceptionByRecurring(
    @Param('id') id: string
  ): Promise<RecurringExceptionDTO> {
    return this.recurringExceptionService.deleteRecurringException(id)
  }
}
