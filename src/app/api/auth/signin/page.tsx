'use client';
import React, { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
type Props = {};

const page = (props: Props) => {
  const { data: session } = useSession();
  console.log(session);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className='space-y-4'>
      <button
        className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
        onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/api/auth/signin' })}
      >
        kakao login
      </button>
      <button
        className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
        onClick={() => signIn('naver', { redirect: true, callbackUrl: '/api/auth/signin' })}
      >
        naver login
      </button>
      <button
        className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    </div>
  );
};

export default page;
