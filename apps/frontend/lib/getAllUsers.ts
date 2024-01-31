import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('failed to fetch users');

  return res.json();
};
