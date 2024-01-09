import { trpc } from '../trpc';

export default async function Server() {
  const response = await trpc.hello.query({ name: 'Patrik' });
  return <h1>{response}</h1>;
}
