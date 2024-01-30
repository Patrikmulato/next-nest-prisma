import { UsersService } from '@backend/users/users.service';
import hashData from './hash-data';

export default async function updateRefreshToken(
  userId: string,
  refreshToken: string,
  usersService: UsersService,
) {
  const hashedRefreshToken = await hashData(refreshToken);
  await usersService.update(userId, {
    refreshToken: hashedRefreshToken,
  });
}
