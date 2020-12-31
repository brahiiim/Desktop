import { TasksService } from './tasks.service';
import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body, Put } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getTasks(): Promise <Task[]> {
            return this.tasksService.getTasks(); 
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : createTaskDto) : Promise<Task> {
            return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id : number) : Promise<void> {
            return this.tasksService.deleteTask(id);
    }    

    @Put('/:id')
    async update(@Param('id') id, @Body() task: Task): Promise<any> {
        task.id = Number(id);
        return this.tasksService.updateTask(task);
    }  

}
