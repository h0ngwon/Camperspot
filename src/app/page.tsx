'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Profile from './profile/[id]/_components/Profile';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }
  return <React.Fragment>
    <Profile/>
  </React.Fragment>;
}
