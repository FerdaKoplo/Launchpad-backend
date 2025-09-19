import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskDTO } from "./dto/task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { TaskFilterDTO } from "./dto/task-filter.dto";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getTasks(
        @Query("workspaceId") workspaceId?: string
    ): Promise<TaskDTO[]> {
        return this.taskService.getTasks(workspaceId);
    }

    @Get(":id")
    async getDetailTask(@Param("id") id: string): Promise<TaskDTO> {
        return this.taskService.getDetailTask(id);
    }

    @Post()
    async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<TaskDTO> {
        return this.taskService.createTask(createTaskDTO);
    }

    @Patch(":id")
    async updateTask(
        @Param("id") id: string,
        @Body() updateTaskDTO: UpdateTaskDTO
    ): Promise<TaskDTO> {
        return this.taskService.updateTask(id, updateTaskDTO);
    }

    @Delete(":id")
    async deleteTask(@Param("id") id: string): Promise<TaskDTO> {
        return this.taskService.deleteTask(id);
    }

    @Get("filter")
    async filterTask(@Query() filters: TaskFilterDTO): Promise<TaskDTO[]> {
        return this.taskService.filterTask(filters);
    }

}