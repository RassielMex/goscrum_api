import { Task, User } from '@prisma/client';

export interface FindTaskDto extends Omit<Task, 'userId'> {
  user: User;
}
