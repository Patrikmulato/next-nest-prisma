import { ConflictException, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findByEmail(createUserDto.email);

    if (user) throw new ConflictException('email duplicated');

    const hashedPassword = await hash(createUserDto.password, 10);

    createUserDto.password = hashedPassword;

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll(role?: UserRole): Promise<UserEntity[]> {
    if (role) {
      return this.prismaService.user.findMany({
        where: {
          role: role,
        },
      });
    }
    return this.prismaService.user.findMany();
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string): Promise<UserEntity> {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
