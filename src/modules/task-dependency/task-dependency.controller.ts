import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TaskDependencyService } from "./task-dependency.service";
import { TaskDependencyDTO } from "./dto/task-dependency.dto";
import { CreateTaskDependencyDTO } from "./dto/create-task-dependency.dto";
import { UpdateTaskDependencyDTO } from "./dto/update-task-dependency.dto";

@Controller('task-dependency')
export class TaskDependencyController{
    constructor (private readonly taskDependencyService : TaskDependencyService) {}

    @Get()
    async getTaskDependenciesByTask(
        taskId : string
    ) : Promise<TaskDependencyDTO[]>{
        return this.taskDependencyService.getTaskDependencies(taskId)
    }

    @Get(':id')
    async getDetailTaskDependencyByTask(
        taskId : string,
        id : string
    ) : Promise<TaskDependencyDTO> {
        return this.taskDependencyService.getDetailTaskDependency(taskId, id)
    }

    @Post()
    async createTaskDependencyByTask(
        @Param('taskId') taskId : string,
        @Body() createTaskDependencyDTO : CreateTaskDependencyDTO
    ) : Promise<TaskDependencyDTO>{
        return this.taskDependencyService.createTaskDependency(taskId, createTaskDependencyDTO)
    }

    @Patch(':id')
    async updateTaskDependencyByTask(
        @Param('id') id :string,
        @Param('taskId') taskId : string,
        @Body() updateTaskDependencyDTO : UpdateTaskDependencyDTO
    ) : Promise<TaskDependencyDTO> {
        return this.taskDependencyService.updateTaskDependency(id, taskId, updateTaskDependencyDTO)
    }

    @Delete(':id')
    async deleteTaskDependencyByTask(
        @Param('id') id : string
    ) : Promise<TaskDependencyDTO>{
        return this.taskDependencyService.deleteTaskDependency(id)
    }
}