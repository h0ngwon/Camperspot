'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getUserData } from '../_lib/getUserData';
import styles from '../_styles/Profile.module.css';
import ModalPortal from '@/components/ModalPortal';
import Modal from '@/components/Modal';
import useModalStore from '@/store/modal';
import ProfileModifyForm from './ProfileModifyForm';

const Profile = () => {
  const { show, toggleModal } = useModalStore();
  const params = useParams();
  const { data } = useQuery({
    queryKey: ['mypage', 'profile'],
    queryFn: async () => getUserData(params.id as string),
  });

  return (
    <div className={styles.container}>
      <div className={styles['profile-header']}>프로필 관리</div>
      <div className={styles['profile-container']}>
        {data?.profile_url && (
          <Image
            src={data?.profile_url as string}
            width={120}
            height={120}
            alt='profile'
          />
        )}

        <div className={styles['nickname-container']}>
          <div className={styles['nickname-header']}>닉네임</div>
          <div className={styles['nickname']}>{data?.nickname}</div>
          <button onClick={toggleModal}>프로필 수정</button>
          {show && (
            <ModalPortal>
              <Modal>
                <ProfileModifyForm />
              </Modal>
            </ModalPortal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
