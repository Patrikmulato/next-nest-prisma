//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from '@backend/users/users.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy.ts';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
