import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const res = await fetch('http://localhost:3002/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  return Response.json(res);
};

export const GET = async (req: NextRequest) => {
  return Response.json('Hello');
};
