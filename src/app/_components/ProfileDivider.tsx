import MyProfileSvg from '@/components/MyProfileSvg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../_styles/Header.module.css';
import { Session } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../profile/[id]/_lib/profile';

type Props = {
  session: Session;
};

const ProfileDivider = ({ session }: Props) => {
  const { data } = useQuery({
    queryKey: ['mypage', 'profile', session?.user.id],
    queryFn: getUserData,
  });
  return (
    <>
      {session.user.role === 'company' ? (
        <Link href={`/company/${session.user.id}/manage_reservation`}>
          <MyProfileSvg />
          <p>company</p>
        </Link>
      ) : (
        <Link href={`/profile/${session.user.id}`}>
          <Image
            src={data?.profile_url!}
            alt=''
            width={36}
            height={36}
            className={styles.profileImg}
          />
          <p>마이</p>
        </Link>
      )}
    </>
  );
};

export default ProfileDivider;
