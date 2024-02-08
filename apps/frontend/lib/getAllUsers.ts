import { User } from '@prisma/client';
import { Session } from 'next-auth';

export const getAllUsers = async (session: Session | null): Promise<User[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: 'GET',
    next: { revalidate: 60 },
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error('failed to fetch users');

  return res.json();
};
