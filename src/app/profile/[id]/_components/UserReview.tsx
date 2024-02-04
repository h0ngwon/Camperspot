'use client';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import useModalStore from '@/store/modal';
import { ReviewType } from '@/types/review';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { getUserReview } from '../_lib/review';
import styles from '../_styles/UserReview.module.css';
import ReviewConfirmModal from './ReviewConfirmModal';
import Star from './Star';

const UserReview = () => {
  const { show, toggleModal } = useModalStore();

  const params = useParams();
  const userId = params.id as string;
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<number | null>();
  const { data } = useQuery<ReviewType>({
    queryKey: ['mypage', 'profile', 'review', userId],
    queryFn: getUserReview,
  });

  const rating = [1, 2, 3, 4, 5];

  const deleteHandler = (reviewId: string, idx: number) => {
    setIsOpenReviewModal(idx);
    toggleModal();
  };
  return (
    <div className={styles.container}>
      <div className={styles['review-header']}>리뷰 관리</div>
      <div className={styles['review-container']}>
        {data?.map((item, idx) => (
          <div className={styles['review']} key={idx}>
            <button
              className={styles['delete-btn']}
              onClick={() => {
                deleteHandler(item.id, idx);
              }}
            >
              삭제하기
            </button>
            <span className={styles['camp-name']}>{item.camp.name}</span>
            <div className={styles['rating-date-container']}>
              <span>
                {rating.map((r, idx) => (
                  <Star key={idx} active={r <= item.rating ? 'active' : ''} />
                ))}
              </span>
              <div className={styles['date']}>
                {new Date(item.created_at).toISOString().split('T')[0]}
              </div>
            </div>
            <div className={styles['content']}>{item.content}</div>
            {show && isOpenReviewModal === idx && (
              <ModalPortal>
                <Modal customWidth={526} customHeight={250}>
                  <ReviewConfirmModal reviewId={item.id} userId={userId}/>
                </Modal>
              </ModalPortal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(UserReview);
