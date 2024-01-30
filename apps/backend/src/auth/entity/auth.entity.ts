import { ApiProperty } from '@nestjs/swagger';

type Auth = {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export class AuthEntity implements Auth {
  constructor(auth: Auth) {
    Object.assign(this, auth);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
