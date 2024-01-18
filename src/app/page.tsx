'use client';
import { useSession } from 'next-auth/react';
import Main from './_components/Main';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }
  return <Main />;
}
