import { ApiProperty } from '@nestjs/swagger';

type Auth = {
  userData: {
    id: string;
    email: string;
    name: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export class AuthEntity implements Auth {
  constructor(auth: Auth) {
    Object.assign(this, auth);
  }

  @ApiProperty()
  userData: {
    id: string;
    email: string;
    name: string;
  };

  @ApiProperty()
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
