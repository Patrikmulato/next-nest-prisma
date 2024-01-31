import { User } from '@prisma/client';

export const getUser = async (userId: string): Promise<User | undefined> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`
  );

  if (!res.ok) return undefined;

  return res.json();
};
