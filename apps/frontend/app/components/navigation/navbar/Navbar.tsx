'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const { data: session } = useSession();

  console.log({ session });

  return (
    <>
      <div className='w-full h-20 bg-slate-900 sticky top-0'>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <button
              type='button'
              className='inline-flex items-center md:hidden'
              onClick={toggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                viewBox='0 0 24 24'
              >
                <path
                  fill='#fff'
                  d='M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z'
                />
              </svg>
            </button>
            <ul className='hidden md:flex gap-x-6 text-white '>
              <li>
                <Link href='/'>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href='/users'>
                  <p>Users</p>
                </Link>
              </li>
            </ul>
            {session && session.user ? (
              <div className='hidden md:block'>
                <h3>{session.user.name}</h3>
                <Link href='/api/auth/signout'>
                  <button className='h-12 rounded-lg bg-sky-900 font-bold px-5'>
                    Sign Out
                  </button>
                </Link>
              </div>
            ) : (
              <div className='hidden md:block'>
                <Link href='/api/auth/signin'>
                  <button className='h-12 rounded-lg bg-sky-900 font-bold px-5'>
                    Sign In
                  </button>
                </Link>
                <Link href='/signup'>
                  <button className='h-12 rounded-lg bg-sky-900 font-bold px-5'>
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
