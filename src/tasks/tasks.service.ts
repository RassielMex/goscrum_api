import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createTaskDto: CreateTaskDto) {
    const userIsValid = await this.prisma.user.findFirst({
      where: { id: createTaskDto.userId },
    });
    if (!userIsValid) {
      throw new HttpException('Usuario invalido', HttpStatus.BAD_REQUEST);
    }
    const createTask = await this.prisma.task.create({ data: createTaskDto });
    return createTask;
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  async findByTeamId(teamId: number) {
    if (!teamId) {
      throw new HttpException('Team Id invalido', HttpStatus.BAD_REQUEST);
    }
    const findResp = await this.prisma.task.findMany({
      where: {
        user: {
          teamId,
        },
      },
    });
    if (!findResp) {
      throw new HttpException('Usuario invalido', HttpStatus.NOT_FOUND);
    }
    return findResp;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskExists = await this.prisma.task.findFirst({ where: { id } });
    if (!taskExists) {
      throw new HttpException('No se encontr tarea', HttpStatus.NOT_FOUND);
    }
    const updataskResp = this.prisma.task.update({
      where: { id },
      data: { ...updateTaskDto },
    });
    return updataskResp;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
