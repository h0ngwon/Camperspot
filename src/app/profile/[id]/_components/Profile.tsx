'use client';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import useModalStore from '@/store/modal';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import kakao from '../../../../asset/ico_kakao.png';
import naver from '../../../../asset/ico_naver.png';
import pencil from '../../../../asset/mdi_pencil.svg';
import { getUserData } from '../_lib/getUserData';
import styles from '../_styles/Profile.module.css';
import ProfileModifyForm from './ProfileModifyForm';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { show, toggleModal } = useModalStore();
  const { data: session } = useSession();
  console.log(session);
  const params = useParams();
  const { data } = useQuery({
    queryKey: ['mypage', 'profile', params.id],
    queryFn: async () => getUserData(params.id as string),
  });
  console.log({ data });

  return (
    <div className={styles.container}>
      <div className={styles['profile-container']}>
        <div className={styles['profile-header']}>프로필 관리</div>
        <div className={styles['profile-inner']}>
          {data?.profile_url && (
            <Image
              src={`${data?.profile_url}` as string}
              width={120}
              height={120}
              alt='profile'
            />
          )}
          <div className={styles['nickname-container']}>
            <div className={styles['nickname-header']}>닉네임</div>
            <div className={styles['nickname-inner']}>
              <div className={styles['nickname']}>{data?.nickname}</div>
              <button className={styles['modify-btn']} onClick={toggleModal}>
                <Image src={pencil} width={24} height={24} alt='modify' />
              </button>
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
      </div>
      <div className={styles['account-container']}>
        <div className={styles['account-header']}>계정정보</div>
        <div className={styles['account-inner']}>
          <div className={styles['provider']}>
            <div>
              <label>가입정보</label>
              <span>
                {data?.provider === 'kakao' && '카카오 이메일 간편가입'}
                {data?.provider === 'kakao' && (
                  <Image src={kakao} width={16} height={16} alt='kakao' />
                )}
              </span>
              <span>
                {data?.provider === 'naver' && '네이버 이메일 간편가입'}
                {data?.provider === 'naver' && (
                  <Image src={naver} width={16} height={16} alt='naver' />
                )}
              </span>
            </div>
            <div>
              <label>이메일</label>
              <span>{data?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
