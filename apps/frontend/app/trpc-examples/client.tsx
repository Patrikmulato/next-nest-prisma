'use client';

import React, { useEffect, useState } from 'react';
import { trpc } from '../trpc';

const Client = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    trpc.hello.query({ name: 'Client' }).then((response) => setName(response));
  }, []);

  return <div>{name}</div>;
};

export default Client;
