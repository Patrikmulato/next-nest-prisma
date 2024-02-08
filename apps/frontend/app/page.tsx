import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <h1>Home Page Hi {session?.user?.name}</h1>
      </div>
    </main>
  );
}
