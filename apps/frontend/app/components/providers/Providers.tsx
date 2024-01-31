'use client';

import { ScriptProps } from 'next/script';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: ScriptProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
