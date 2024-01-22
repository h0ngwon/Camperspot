import React from 'react';
import Image from 'next/image';
import profileImg from '@/asset/profile.jpeg';

import styles from '../_styles/CommuUser.module.css';
import MoreSvg from '../_svg/MoreSvg';

type Props = {
  user: {
    nickname: string;
    profile_url: string | null;
  } | null;
};

export default function CommuUser({ user }: Props) {
  return (
    <div className={styles.userWrap}>
      {user && (
        <div className={styles.user}>
          {user.profile_url ? (
            <Image src={user.profile_url} alt='' width={32} height={32} />
          ) : (
            <Image src={profileImg} alt='' fill />
          )}
          <p>{user.nickname}</p>
        </div>
      )}
      <MoreSvg />
    </div>
  );
}
