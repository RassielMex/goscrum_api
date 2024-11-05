import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    //console.log(createTeamDto);
    return await this.prisma.team.create({ data: createTeamDto });
  }

  async findAll() {
    return await this.prisma.team.findMany();
  }

  async findOne(id: number) {
    const findOneResp = await this.prisma.team.findFirst({ where: { id } });
    if (!findOneResp) {
      throw new HttpException(
        'No se encontro equipo con ese id',
        HttpStatus.NOT_FOUND,
      );
    }
    return findOneResp;
  }

  async findbyIdentifier(identifier: string) {
    const findOneResp = await this.prisma.team.findFirst({
      where: { identifier },
    });
    if (!findOneResp) {
      throw new HttpException(
        'No se encontro equipo con ese identificador',
        HttpStatus.NOT_FOUND,
      );
    }
    return findOneResp;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const updateTeamResp = await this.prisma.team.update({
      where: { id },
      data: { identifier: updateTeamDto.identifier },
    });
    if (!updateTeamResp) {
      throw new HttpException(
        'No se encontro equipo con ese id',
        HttpStatus.NOT_FOUND,
      );
    }
    return updateTeamResp;
  }

  async remove(id: number) {
    const deleteTeamResp = await this.prisma.team.delete({
      where: { id },
    });
    if (!deleteTeamResp) {
      throw new HttpException(
        'No se encontro equipo con ese id',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleteTeamResp;
  }
}
