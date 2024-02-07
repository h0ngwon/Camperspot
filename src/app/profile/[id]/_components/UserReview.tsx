'use client';
import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import { useReviewQuery } from '@/hooks/useReviewQuery';
import useModalStore from '@/store/modal';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import styles from '../_styles/UserReview.module.css';
import ReviewConfirmModal from './ReviewConfirmModal';
import Star from './Star';

const UserReview = () => {
  const params = useParams();
  const userId = params.id as string;
  const { show, toggleModal } = useModalStore();
  const { review, isReviewLoading } = useReviewQuery();
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<number | null>();
  const rating = [1, 2, 3, 4, 5];

  const deleteHandler = (idx: number) => {
    setIsOpenReviewModal(idx);
    toggleModal();
  };

  const closeModalHandler = () => {
    toggleModal();
    setIsOpenReviewModal(null);
  };

  if (isReviewLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['review-header']}>리뷰 관리</div>
      <div className={styles['review-container']}>
        {review?.map((item, idx) => (
          <div className={styles['review']} key={idx}>
            <button
              className={styles['delete-btn']}
              onClick={() => {
                deleteHandler(idx);
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
                  <ReviewConfirmModal
                    reviewId={item.id}
                    userId={userId}
                    onClose={closeModalHandler}
                  />
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
