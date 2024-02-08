'use server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUser } from '@frontend/lib/getUser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@frontend/app/api/auth/[...nextauth]/authOptions';
import { getAllUsers } from '@frontend/lib/getAllUsers';

type UserPageParams = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: UserPageParams): Promise<Metadata> {
  const session = await getServerSession(authOptions);

  const user = await getUser(userId, session);

  if (!user) {
    return { title: 'User Not found' };
  }

  return {
    title: user.name,
    description: `${user.name} info page`,
  };
}

export default async function UserPage({ params: { userId } }: UserPageParams) {
  const session = await getServerSession(authOptions);

  const user = await getUser(userId, session);

  if (!user?.id) {
    return notFound();
  }

  return (
    <div className='block rounded-lg bg-black text-center bg-neutral-700 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='border-b-2 px-6 py-3 border-neutral-600 text-neutral-50'>
        {user?.name}
      </div>
      <div className='p-6'>
        <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-50'>
          {user?.role}
        </h5>
        <p className='mb-4 text-base text-neutral-200'>{user?.email}</p>
      </div>
      <div className='border-t-2 px-6 py-3 border-neutral-600 text-neutral-50'>
        created: {user?.createdAt.toString()}
      </div>
      <div className='border-t-2 px-6 py-3 border-neutral-600 text-neutral-50'>
        updated: {user?.updatedAt.toString()}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers(session);

  return users.map((user) => ({
    userId: user.id,
  }));
}
