import React from 'react';
import Image from 'next/image';

type Props = {
  user: {
    nickname: string;
    profile_url: string | null;
  } | null;
};

export default function CommUser({ user }: Props) {
  return (
    <div>
      {user && (
        <div>
          {user.profile_url ? (
            <Image src={user.profile_url} alt='' width={50} height={50} />
          ) : (
            <div>No profile image available</div>
          )}
          <p>{user.nickname}</p>
        </div>
      )}
    </div>
  );
}
