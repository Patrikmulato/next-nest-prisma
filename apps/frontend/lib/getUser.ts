import { User } from '@prisma/client';
import { Session } from 'next-auth';

export const getUser = async (
  userId: string,
  session: Session | null
): Promise<User> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
    {
      method: 'GET',
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  if (!res.ok) throw new Error('failed to fetch user');

  return res.json();
};
