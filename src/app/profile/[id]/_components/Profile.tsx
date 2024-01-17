'use client';
import React from 'react';
import styles from '../_styles/Profile.module.css';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const {data: session} = useSession();
  return <div className={styles.container}>{session?.user.id}</div>;
};

export default Profile;
