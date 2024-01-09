import Server from './server';
import { trpc } from '../trpc';
import Client from './client';

export default async function TRPCExample() {
  const response = await trpc.hello.query({ name: 'Patrik' });
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <Server />
        <Client />
      </div>
    </main>
  );
}
