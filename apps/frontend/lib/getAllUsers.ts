import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch('http://localhost:3002/api/users', {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('failed to fetch users');

  return res.json();
};
