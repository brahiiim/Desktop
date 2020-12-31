import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TasksService {

constructor( 
    @InjectRepository(TaskRepository)
    private taskRepository : TaskRepository,
    ){}

    async getTasks() : Promise <Task[]>{
        return this.taskRepository.getTasks();
        }

    async getTaskById(id : number): Promise <Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;    
    }

    async createTask(createTaskDto : createTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }
 
    async deleteTask(id : number): Promise <void>{
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTask(task: Task): Promise<UpdateResult> {
        return await this.taskRepository.update(task.id,task);
    }
}
