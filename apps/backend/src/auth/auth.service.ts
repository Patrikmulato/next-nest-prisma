//src/auth/auth.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '@backend/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '@backend/users/dto/create-user.dto';
import { AuthEntity } from './entity/auth.entity';
import validateUser from './utils/validate-user';
import getTokens from './utils/get-tokens';
import updateRefreshToken from './utils/update-refresh-token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // REGISTER
  async register(createUserDto: CreateUserDto): Promise<AuthEntity> {
    const newUser = await this.usersService.create(createUserDto);

    const tokens = await getTokens(newUser.id, newUser.email, this.jwtService);
    await updateRefreshToken(
      newUser.id,
      tokens.refreshToken,
      this.usersService,
    );

    return {
      userData: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      tokens: { ...tokens },
    };
  }

  // LOGIN
  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const user = await validateUser(loginDto, this.usersService);

    const tokens = await getTokens(user.id, user.email, this.jwtService);
    await updateRefreshToken(user.id, tokens.refreshToken, this.usersService);

    return {
      userData: { ...user },
      tokens: { ...tokens },
    };
  }

  async logout(userId?: string): Promise<string> {
    if (!userId) {
      throw new NotFoundException(`No user id found: ${userId}`);
    }
    const res = await this.usersService.update(userId, {
      refreshToken: undefined,
    });
    if (res) {
      return 'success';
    }
    return 'failed';
  }

  async refreshToken(
    userId?: string,
    refreshToken?: string,
  ): Promise<AuthEntity> {
    if (!userId || !refreshToken) {
      throw new NotFoundException(
        `No user id or refresh token found: id: ${userId} token: ${refreshToken}`,
      );
    }

    const user = await this.usersService.findById(userId);

    if (!user)
      throw new NotFoundException(`No user found with this id: ${userId}`);

    if (!user.refreshToken)
      throw new NotFoundException(`User has no refresh Token`);

    const isRefreshTokenValid = compare(user.refreshToken, refreshToken);
    if (!isRefreshTokenValid) throw new ForbiddenException('Access Denied');

    const tokens = await getTokens(user.id, user.email, this.jwtService);
    await updateRefreshToken(user.id, tokens.refreshToken, this.usersService);

    return {
      userData: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      tokens: { ...tokens },
    };
  }
}
