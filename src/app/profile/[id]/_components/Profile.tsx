'use client';
import { Usertype } from '@/types/auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../_styles/Profile.module.css';

const Profile = () => {
  const { data: session, status } = useSession();
  // 세션이 로딩 될 때까지 로딩처리
  const [profile, setProfile] = useState<Usertype>(null);

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/profile/${session?.user.id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const fetchData = await response.json();
      console.log(fetchData);
      setProfile(fetchData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles['profile-header']}>프로필 관리</div>
      <div>{profile?.email}</div>
    </div>
  );
};

export default Profile;
