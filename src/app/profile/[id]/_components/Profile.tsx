'use client';
import { UserType } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../_styles/Profile.module.css';
import Image from 'next/image';

const Profile = () => {
  const [profile, setProfile] = useState<UserType>(null);
  const { data: session, status } = useSession();
  
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${session?.user.id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const fetchData: UserType = await response.json();
      console.log('fetchData==================', fetchData);
      setProfile(fetchData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile()
  }, [session])
  

  return (
    <div className={styles.container}>
      <div className={styles['profile-header']}>프로필 관리</div>
      <div className={styles['profile-container']}>
        <Image src={profile?.profile_url as string} width={120} height={120} alt='profile'/>
        <div className={styles['nickname-container']}>
          <div>닉네임</div>
          <div className={styles['nickname']}>{profile?.nickname}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
