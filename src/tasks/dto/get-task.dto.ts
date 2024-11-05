import { Task, User } from '@prisma/client';

export interface GetTaskDto extends Task {
  user: User;
}
