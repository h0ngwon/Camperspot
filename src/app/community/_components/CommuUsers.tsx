import React from 'react';
import Image from 'next/image';
import profileImg from '@/asset/profile.jpeg';

import styles from '../_styles/CommuUser.module.css';
import MoreSvg from '../_svg/MoreSvg';

type Props = {
  user: {
    nickname: string;
    profile_url: string;
  } | null;
};

export default function CommuUser({ user }: Props) {
  return (
    <div className={styles.userWrap}>
      <div className={styles.user}>
        <Image src={user!.profile_url} alt='' width={32} height={32} />
        <p>{user?.nickname}</p>
      </div>

      <MoreSvg />
      <button>삭제</button>
    </div>
  );
}
