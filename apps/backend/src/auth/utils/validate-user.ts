import { UsersService } from '@backend/users/users.service';
import { LoginDto } from '../dto/login.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

// VALIDATE USER
export default async function validateUser(
  loginDto: LoginDto,
  userService: UsersService,
) {
  const user = await userService.findByEmail(loginDto.email);

  if (!user) {
    throw new NotFoundException(`No user found for email: ${loginDto.email}`);
  }

  const isPasswordValid = await compare(loginDto.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid password');
  }

  return {
    id: user.id,
    email: user.email,
  };
}
