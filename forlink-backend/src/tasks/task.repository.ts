import { createTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks() : Promise<Task[]>{
        const query = this.createQueryBuilder('task');
        const tasks = await query.getMany();
        return tasks;

    }

    async createTask(createTaskDto : createTaskDto) : Promise<Task>{
        const {title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description=description;
        await task.save();

        return task;

    }
}