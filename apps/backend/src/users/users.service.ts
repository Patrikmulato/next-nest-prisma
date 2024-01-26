import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll(role?: UserRole) {
    if (role) {
      return this.prismaService.user.findMany({
        where: {
          role: role,
        },
      });
    }
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
