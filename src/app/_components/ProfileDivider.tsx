'use client';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Company from '../_Svg/CompanySvg';
import styles from '../_styles/ProfileDiveder.module.css';
import { getUserData } from '../profile/[id]/_lib/profile';
import ProfileDropDown from './ProfileDropDown';
import MyProfileSvg from '@/components/MyProfileSvg';

type Props = {
  session: Session;
};

const ProfileDivider = ({ session }: Props) => {
  const { data } = useQuery({
    queryKey: ['mypage', 'profile', session?.user.id],
    queryFn: getUserData,
  });
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onHandleOpenDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setTimeout(() => {
        setIsOpen(false);
      }, 0);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        onClick={onHandleOpenDropdown}
        className={styles.profileType}
        ref={dropDownRef}
      >
        {session.user.role === 'company' ? (
          <>
            <Company />
            <p>사장님</p>
          </>
        ) : (
          <>
            <Image
              src={data?.profile_url ?? <MyProfileSvg/>}
              alt=''
              width={36}
              height={36}
              className={styles.profileImg}
            />
            <p>마이</p>
          </>
        )}
      </div>
      {isOpen && <ProfileDropDown session={session} />}
    </>
  );
};

export default ProfileDivider;
