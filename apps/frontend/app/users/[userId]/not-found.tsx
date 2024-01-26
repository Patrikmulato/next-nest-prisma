import React from 'react';

export default function NotFound() {
  return (
    <div className='bg-dark min-h-screen flex flex-grow items-center justify-center'>
      <div className='rounded-lg bg-sky-900 p-8 text-center shadow-xl'>
        <h1 className='mb-4 text-4xl font-bold'>404</h1>
        <p>User does not exist.</p>
        <a
          href='/'
          className='mt-4 inline-block rounded bg-sky-300 px-4 py-2 font-semibold text-white hover:bg-sky-500'
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
}
