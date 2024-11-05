import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaClient],
})
export class TasksModule {}
