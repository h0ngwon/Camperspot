'use client';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

// TODO: 굳이 한 번 더 children으로 감싼 이유?
const AuthSession = ({ children }: Props) => {

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSession;
