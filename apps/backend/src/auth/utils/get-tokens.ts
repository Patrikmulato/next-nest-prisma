import { JwtService } from '@nestjs/jwt';

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
        expiresIn: '15m',
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
  };
}
