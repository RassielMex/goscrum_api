import { CreateTeamDto } from './create-team.dto';

//export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
export type UpdateTeamDto = Partial<CreateTeamDto>;
