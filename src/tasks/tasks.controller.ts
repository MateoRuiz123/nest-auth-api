import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() body: { title: string; description?: string },
    @Req() req,
  ) {
    const user = req.user;
    return this.tasksService.createTask(body.title, body.description, user);
  }

  @Get()
  async getTasks(@Req() req) {
    const user = req.user;
    return this.tasksService.getTasks(user);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.tasksService.getTaskById(id, user);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string },
    @Req() req,
  ) {
    const user = req.user;
    return this.tasksService.updateTask(id, body.title, body.description, user);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Req() req) {
    const user = req.user;
    return this.tasksService.deleteTask(id, user);
  }
}
