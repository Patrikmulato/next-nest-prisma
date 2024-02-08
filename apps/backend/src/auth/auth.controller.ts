//src/auth/auth.controller.ts

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '@backend/users/dto/create-user.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { AuthEntity } from './entity/auth.entity';
import { FastifyRequest } from 'fastify';

interface CustomRequest extends FastifyRequest {
  user?: { sub: string; refreshToken: string }; // Add your user property definition here
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: AuthEntity })
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthEntity> {
    return new AuthEntity(await this.authService.register(createUserDto));
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return new AuthEntity(await this.authService.login(loginDto));
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiOkResponse({ description: 'success' })
  async logout(@Req() req: CustomRequest): Promise<string> {
    return this.authService.logout(req.user?.sub);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOkResponse({ type: AuthEntity })
  async refreshToken(@Req() req: CustomRequest): Promise<AuthEntity> {
    const userId = req.user?.sub;
    const refreshToken = req.user?.refreshToken;

    return new AuthEntity(
      await this.authService.refreshToken(userId, refreshToken),
    );
  }
}
