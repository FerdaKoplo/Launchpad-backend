import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SubTaskService } from "./sub-task.service";
import { SubTaskDTO } from "./dto/sub-task.dto";
import { CreateSubTaskDTO } from "./dto/create-sub-task.dto";
import { UpdateSubTaskDTO } from "./dto/update-sub-tasl.dto";

@Controller('sub-task')
export class SubTaskController {
    constructor(private readonly subTaskService: SubTaskService) { }

    @Get()
    async getSubTaskByTask(
        taskId: string
    ): Promise<SubTaskDTO[]> {
        return this.subTaskService.getSubTasks(taskId)
    }

    @Get(':id')
    async getDetailSubtaskbyTask(
        taskId: string,
        id: string
    ): Promise<SubTaskDTO> {
        return this.subTaskService.getDetailSubTask(taskId, id)
    }

    @Post()
    async createSubTask(
        @Param("taskId") taskId: string,
        @Body() createSubTaskDTO: CreateSubTaskDTO
    ): Promise<SubTaskDTO> {
        return this.subTaskService.createSubTaskbyTask(taskId, createSubTaskDTO)
    }

    @Put(":id")
    async updateSubTask(
        @Param("taskId") taskId: string,
        @Param("id") id: string,
        @Body() updateSubtaskDTO: UpdateSubTaskDTO
    ): Promise<SubTaskDTO> {
        return this.subTaskService.updateSubTaskByTask(taskId, id, updateSubtaskDTO);
    }

    @Delete(":id")
    async deleteSubTask(
        @Param("taskId") taskId: string,
        @Param("id") id: string
    ): Promise<void> {
        return this.subTaskService.deleteSubTaskByTask(taskId, id)
    }
}