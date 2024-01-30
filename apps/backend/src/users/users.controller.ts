import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MyLoggerService } from '@backend/my-logger/my-logger.service';
import { AccessTokenGuard } from '@backend/auth/guards/accessToken.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new MyLoggerService(UsersController.name);

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findById(id);

    if (!user) {
      return null;
    }

    return new UserEntity(user);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove(id));
  }
}
