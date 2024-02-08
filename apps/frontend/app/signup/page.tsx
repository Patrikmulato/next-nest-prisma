'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import InputBox from '../components/input-box/InputBox';
import { Button } from '../components/button/Button';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'ddddd',
        email: 'd@gmail.com',
        password: 'password1',
      }),
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert('User Registered!');
    console.log({ response });
  };

  const data = useRef<FormInputs>({
    name: '',
    email: '',
    password: '',
  });
  return (
    <div className='m-2 border rounded overflow-hidden shadow bg-gray-800 text-white'>
      <div className='p-2 bg-gray-900 text-white'>Sign up</div>
      <div className='p-2 flex flex-col gap-6 text-white'>
        <InputBox
          autoComplete='off'
          name='name'
          labelText='Name'
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name='email'
          labelText='Email'
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name='password'
          labelText='password'
          type='password'
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className='flex justify-center items-center gap-2'>
          <Button onClick={register}>Submit</Button>
          <Link className='' href={'/'}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
