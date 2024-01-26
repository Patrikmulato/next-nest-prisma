import { User } from '@prisma/client';

export const getUser = async (userId: string): Promise<User | undefined> => {
  const res = await fetch(`http://localhost:3002/api/users/${userId}`);

  if (!res.ok) return undefined;

  return res.json();
};
