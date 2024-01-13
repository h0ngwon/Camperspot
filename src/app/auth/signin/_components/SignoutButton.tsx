'use client';
import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {}

const SignoutButton = (props: Props) => {
  return (
    <button onClick={() => signOut()}>로그아웃</button>
  )
}

export default SignoutButton