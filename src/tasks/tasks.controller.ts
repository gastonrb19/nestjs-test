import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import TasksEntity from './tasks.entity';
import { CreateDtoTasks } from './dtoTasks/createDtoTasks';
import { FilterGetDtoTasks } from './dtoTasks/filterGetDtoTasks';
import { Query } from '@nestjs/common';
import { UpdateDtoTask } from './dtoTasks/updateDtoTask';
import { status } from './tasks.enums';
import { UpdateStatusDtoTask } from './dtoTasks/updateStatusDtoTask';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createDto: CreateDtoTasks): Promise<TasksEntity> {
    return await this.tasksService.createTask(createDto);
  }

  @Get()
  async getTasks(
    @Query() filterDto: FilterGetDtoTasks,
  ): Promise<TasksEntity[]> {
    if (
      Object.keys(filterDto).length === 0 ||
      !filterDto.status ||
      !filterDto.priority
    ) {
      throw new HttpException(
        'You must provide status and priority to filter the tasks',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTask(@Param('id') id: number): Promise<TasksEntity> {
    return await this.tasksService.getTask(id);
  }

  /*
    /tasks/:id
    {
        "update_task": {
            "title": "New title",
            "description": "New description",
            "priority": "HIGH"
        }
    }
   */
  @Patch('/:id')
  async updateTask(
    @Param('id') id: number,
    @Body('update_task') updateDto: UpdateDtoTask,
  ): Promise<TasksEntity> {
    //Check if there's values to update
    if (!updateDto || Object.keys(updateDto).length === 0) {
      throw new HttpException(
        'No values provided for update',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.tasksService.updateTask(id, updateDto);
  }

  /*
    /tasks/status/:id
    {
        "status": "IN_PROGRESS"
    }
   */
  @Patch('/status/:id')
  async updateStatusTask(
    @Param('id') id: number,
    @Body('status') status: UpdateStatusDtoTask,
  ): Promise<TasksEntity> {
    if (!status) {
      throw new HttpException(
        'Status value is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.tasksService.updateStatusTask(id, status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
