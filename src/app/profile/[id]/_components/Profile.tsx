'use client';
import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import useModalStore from '@/store/modal';
import Image from 'next/image';
import kakao from '../../../../asset/ico_kakao.png';
import naver from '../../../../asset/ico_naver.png';
import pencil from '../../../../asset/mdi_pencil.svg';
import styles from '../_styles/Profile.module.css';
import ProfileModifyForm from './ProfileModifyForm';

const Profile = () => {
  const { show, toggleModal } = useModalStore();
  const { profile, isProfileLoading } = useProfileQuery();

  if (isProfileLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['profile-container']}>
        <div className={styles['profile-header']}>프로필 관리</div>
        <div className={styles['profile-inner']}>
          <div className={styles['profile-image-wrapper']}>
            {profile?.profile_url && (
              <Image
                src={`${profile?.profile_url}` as string}
                width={120}
                height={120}
                alt='profile'
                priority
                className={styles['profile-image']}
                onClick={toggleModal}
              />
            )}
          </div>
          <div className={styles['nickname-container']}>
            <div className={styles['nickname-header']}>닉네임</div>
            <div className={styles['nickname-inner']}>
              <div className={styles['nickname']}>{profile?.nickname}</div>
              <button
                className={styles['modify-btn']}
                onClick={() => {
                  toggleModal();
                  document.body.style.overflow = 'hidden';
                }}
              >
                <Image src={pencil} width={24} height={24} alt='modify' />
              </button>
              {show && (
                <ModalPortal>
                  <Modal customWidth={458} customHeight={452}>
                    <ProfileModifyForm />
                  </Modal>
                </ModalPortal>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles['account-container']}>
        <div className={styles['account-header']}>계정 정보</div>
        <div className={styles['account-inner']}>
          <div className={styles['provider']}>
            <span className={styles['provider-info']}>가입정보</span>
            <div className={styles['provider-inner']}>
              <span>
                {profile?.provider === 'kakao' && '카카오 이메일 간편가입'}{' '}
                {profile?.provider === 'kakao' && (
                  <Image src={kakao} width={16} height={16} alt='kakao' />
                )}
              </span>
              <span>
                {profile?.provider === 'naver' && '네이버 이메일 간편가입'}{' '}
                {profile?.provider === 'naver' && (
                  <Image src={naver} width={16} height={16} alt='naver' />
                )}
              </span>
              <span>{profile?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
