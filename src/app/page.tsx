'use client';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  
  if(session) {
    console.log(session);
  }
  return <main></main>;
}
