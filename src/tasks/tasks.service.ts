import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import TasksEntity from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDtoTasks } from './dtoTasks/createDtoTasks';
import { FilterGetDtoTasks } from './dtoTasks/filterGetDtoTasks';
import { UpdateDtoTask } from './dtoTasks/updateDtoTask';
import { UpdateStatusDtoTask } from './dtoTasks/updateStatusDtoTask';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>){}

    async createTask(createDto: CreateDtoTasks) : Promise<any> {
        //Validar si existe una tarea con el mismo título
        const existingTask = await this.tasksRepository.findOne({ where: { title: createDto.title } });
        if(existingTask){
            throw new HttpException('Task with the same title already exists', HttpStatus.CONFLICT);
        }

        //instanciar
        const newTasks = new TasksEntity();
        Object.assign(newTasks, createDto);

        //create
        return await this.tasksRepository.save(newTasks);
    }

    async getTasks(filterDto: FilterGetDtoTasks): Promise<TasksEntity[]>{
        return await this.tasksRepository.find({
            where: {
                status: filterDto.status,
                priority: filterDto.priority
            }
        });
    }

    async getTask(taskId: number): Promise<TasksEntity>{
        const task = await this.tasksRepository.findOne({ where: { id: taskId } });
        if(!task){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return task;
    }

    async updateTask(taskId: number, updateDto: UpdateDtoTask): Promise<TasksEntity>{
        //check if task exists
        const task = await this.getTask(taskId);
        if(!task){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        
        //update
        return await this.tasksRepository.save({ ...task, ...updateDto });
    }


    async updateStatusTask(taskId: number, status: UpdateStatusDtoTask): Promise<TasksEntity>{
        //check if task exists
        const task = await this.getTask(taskId);
        if(!task){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        //update
        task.status = status.status;
        return await this.tasksRepository.save(task);

    }

    async deleteTask(number: number): Promise<void>{
        //Check if task exists
        const task = await this.getTask(number);
        if(!task){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        //delete
        await this.tasksRepository.delete(number);
    }
}
