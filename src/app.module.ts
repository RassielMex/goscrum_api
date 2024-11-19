import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, TeamsModule, TasksModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
