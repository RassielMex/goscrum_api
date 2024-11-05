import { Team } from '@prisma/client';

export type CreateTeamDto = Omit<Team, 'id'>;
