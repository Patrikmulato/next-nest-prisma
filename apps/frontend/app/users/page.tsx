import { UsersList } from './components/UsersList';
import { Metadata } from 'next';
import { getAllUsers } from '@frontend/lib/getAllUsers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export const metadata: Metadata = {
  title: 'Users',
  description: 'List of users',
};

export default async function Users() {
  const session = await getServerSession(authOptions);
  const usersData = getAllUsers(session);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <UsersList promise={usersData} />
      </div>
    </main>
  );
}
