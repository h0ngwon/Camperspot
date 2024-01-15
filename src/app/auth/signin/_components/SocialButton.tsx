'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

type SocialType = {
  provider: string;
};

const SocialButton = ({ provider }: SocialType) => {
  return (
    <button
      className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
      onClick={() =>
        signIn(`${provider}`, {
          redirect: true,
          callbackUrl: '/auth/signin',
        })
      }
    >
      {provider} 로그인
    </button>
  );
};

export default SocialButton;
