import { LoadingSpinner } from '@frontend/app/components/loading-spinner/LoadingSpinner';
import { getAllUsers } from '@frontend/lib/getAllUsers';
import { getUser } from '@frontend/lib/getUser';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type UserPageParams = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: UserPageParams): Promise<Metadata> {
  const user = await getUser(userId);

  if (!user) {
    return { title: 'User Not found' };
  }

  return {
    title: user.name,
    description: `${user.name} info page`,
  };
}

export default async function UserPage({ params: { userId } }: UserPageParams) {
  const user = await getUser(userId);

  if (!user?.id) {
    return notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export async function generateStaticParams() {
  const users = await getAllUsers();

  return users.map((user) => ({
    userId: user.id,
  }));
}
