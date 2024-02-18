'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CommuCreateModal from './_components/CommuCreateModal';
import CommuPostList from './_components/CommuPostList';

import styles from './_styles/Commu.module.css';
import CreateSvg from './_svg/CreateSvg';

export default function CommunityPage() {
  const [isCommuCreateModal, setIsCommuCreateModal] = useState<boolean>(false);

  const { data: session } = useSession();
  const userId = session?.user.id as string;

  const handleCreateModalOpen = () => {
    // 로그인 상태에서만 모달을 열도록 체크
    if (session) {
      setIsCommuCreateModal(true);
    } else {
      toast.error('로그인 후 이용해 주세요.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.createBtn} onClick={handleCreateModalOpen}>
          <CreateSvg />
        </div>
        {isCommuCreateModal && (
          <CommuCreateModal onClose={() => setIsCommuCreateModal(false)} />
        )}
        <CommuPostList userId={userId} />
      </div>
    </>
  );
}
