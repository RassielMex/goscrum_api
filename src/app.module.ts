import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma';

@Module({
  imports: [UsersModule, TeamsModule, TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
