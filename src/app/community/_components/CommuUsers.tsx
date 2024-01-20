import React from 'react';
import Image from 'next/image';
import profileImg from '@/asset/profile.jpeg';

type Props = {
  user: {
    nickname: string;
    profile_url: string | null;
  } | null;
};

export default function CommuUser({ user }: Props) {
  return (
    <>
      {user && (
        <div>
          {user.profile_url ? (
            <Image src={user.profile_url} alt='' width={50} height={50} />
          ) : (
            <Image src={profileImg} alt='' fill />
          )}
          <p>{user.nickname}</p>
        </div>
      )}
    </>
  );
}
