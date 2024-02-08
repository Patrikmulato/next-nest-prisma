import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 100;

export default async function getTokens(
  userId: string,
  email: string,
  jwtService: JwtService,
) {
  const [accessToken, refreshToken] = await Promise.all([
    jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1d',
      },
    ),
    jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    ),
  ]);

  return {
    accessToken,
    refreshToken,
    expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
  };
}
