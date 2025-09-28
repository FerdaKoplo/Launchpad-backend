import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RecurringExceptionDTO } from "./dto/recurring-exception.dto";
import { CreateRecurringExceptionDTO } from "./dto/create-exception.dto";
import { UpdateRecurringExceptionDTO } from "./dto/update-recurring-exception.dto";

@Injectable()
export class RecurringExceptionService {

  constructor(private readonly prisma: PrismaService) { }

  async getRecurringException(
    recurringId: string
  ): Promise<RecurringExceptionDTO[]> {
    return await this.prisma.recurringException.findMany({
      where: {
        ...(recurringId && { recurringId }),
        deletedAt: null
      },

      orderBy: {
        date: "desc"
      }
    })

  }

  async createRecurringException(
    createRecurringExceptionDTO: CreateRecurringExceptionDTO
  ): Promise<RecurringExceptionDTO> {
    return await this.prisma.recurringException.create({
      data: {
        recurringId: createRecurringExceptionDTO.recurringId,
        date: new Date(createRecurringExceptionDTO.date)
      }
    })
  }

  async updateRecurringException(
    id: string,
    updateRecurringExceptionDTO: UpdateRecurringExceptionDTO
  ): Promise<RecurringExceptionDTO> {
    const exceptions = await this.prisma.recurringException.findUnique({
      where: {
        id
      }
    })

    if (!exceptions || exceptions.deletedAt)
      throw new NotFoundException("Exception Not Found")

    return await this.prisma.recurringException.update({
      where: {
        id
      },
      data: {
        ...(updateRecurringExceptionDTO.date && { date: new Date(updateRecurringExceptionDTO.date) })
      }
    })
  }

  async deleteRecurringException(
    id: string
  ): Promise<RecurringExceptionDTO> {
    const exceptions = await this.prisma.recurringException.findUnique({
      where: {
        id
      }
    })

    if (!exceptions || exceptions.deletedAt)
      throw new NotFoundException("Recurring Exception Not Found")

    return await this.prisma.recurringException.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })
  }


}
