import { getAllUsers } from '@frontend/lib/getAllUsers';
import { Suspense } from 'react';
import { LoadingSpinner } from '../components/loading-spinner/LoadingSpinner';
import { UsersList } from './components/UsersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description: 'List of users',
};

export default async function Users() {
  const usersData = getAllUsers();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <UsersList promise={usersData} />
      </div>
    </main>
  );
}
