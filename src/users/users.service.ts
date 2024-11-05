import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { Credential } from './entities/credentials';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new HttpException('Email en uso', HttpStatus.CONFLICT);
    }
    const validTeam = await this.prisma.team.findUnique({
      where: { id: createUserDto.teamId },
    });
    if (!validTeam) {
      throw new HttpException('Team id invalido', HttpStatus.BAD_REQUEST);
    }
    const createUserResp = await this.prisma.user.create({
      data: createUserDto,
    });
    return createUserResp;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByCredentials(credentials: Credential) {
    //console.log('credenctials:', credentials);
    if (!credentials) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const getUserResp = await this.prisma.user.findFirst({
      where: {
        AND: [{ email: credentials.email }, { password: credentials.password }],
      },
    });
    if (!getUserResp) {
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }
    return getUserResp;
  }

  async findByTeam(teamId: number) {
    if (!teamId) {
      throw new HttpException('teamId Invalido', HttpStatus.BAD_REQUEST);
    }
    const findResp = await this.prisma.user.findMany({
      where: {
        teamId,
      },
    });
    if (!findResp) {
      throw new HttpException('Usuario invalido', HttpStatus.NOT_FOUND);
    }
    return findResp;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!userExists) {
      throw new HttpException('Usuario no existente', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    return updateUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
