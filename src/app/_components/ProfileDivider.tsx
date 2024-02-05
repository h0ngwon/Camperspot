'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../_styles/ProfileDiveder.module.css';
import { Session } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../profile/[id]/_lib/profile';
import Company from '../_Svg/Company';
import ProfileDropDown from './ProfileDropDown';

type Props = {
  session: Session;
};

const ProfileDivider = ({ session }: Props) => {
  const { data } = useQuery({
    queryKey: ['mypage', 'profile', session?.user.id],
    queryFn: getUserData,
  });
  const [isOpen, setIsOpen] = useState(false);
  const onHandleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <button onClick={onHandleOpenDropdown} className={styles.profileType}>
        {session.user.role === 'company' ? (
          <>
            <Company />
            <p>사장님</p>
          </>
        ) : (
          <>
            <Image
              src={data?.profile_url!}
              alt=''
              width={36}
              height={36}
              className={styles.profileImg}
            />
            <p>마이</p>
          </>
        )}
      </button>
      {isOpen && <ProfileDropDown session={session} />}
    </>
  );
};

export default ProfileDivider;
