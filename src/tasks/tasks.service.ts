import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRespository: Repository<Task>,
  ) {}

  async createTask(
    title: string,
    description: string,
    user: any,
  ): Promise<Task> {
    // Asignamos al task sólo el id del usuario autenticado
    const task = this.tasksRespository.create({
      title,
      description,
      user: { id: user.userId },
    });
    return this.tasksRespository.save(task);
  }

  async getTasks(user: any): Promise<Task[]> {
    return this.tasksRespository.find({
      where: { user: { id: user.userId } },
    });
  }

  async getTaskById(id: number, user: any): Promise<Task> {
    const task = await this.tasksRespository.findOne({
      where: { id, user: { id: user.userId } },
    });
    if (!task)
      throw new NotFoundException(`No se encontró la tarea con el id ${id}`);
    return task;
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
    user: any,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    return this.tasksRespository.save(task);
  }

  async deleteTask(id: number, user: any): Promise<void> {
    const result = await this.tasksRespository.delete({
      id,
      user: { id: user.userId },
    });
    if (result.affected === 0)
      throw new NotFoundException(`No se encontró la tarea con el id ${id}`);
  }
}
