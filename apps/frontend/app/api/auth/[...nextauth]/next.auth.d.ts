import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    userData: {
      id: string;
      email: string;
      name: string;
    };

    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    userData: {
      id: string;
      email: string;
      name: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
