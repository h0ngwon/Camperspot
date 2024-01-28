import React, { FormEvent, useState } from 'react';
import styles from '../_styles/ReviewModal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReviewInfo } from '@/types/reservation';
import Image from 'next/image';
import Rating from './Rating';
import useInput from '@/hooks/useInput';

type Props = {
  reservationInfo: ReviewInfo;
  onClose: () => void;
};

const ReviewModal = ({ reservationInfo, onClose }: Props) => {
  const params = useParams();
  const { data: campData } = useQuery({
    queryKey: ['camp', 'review', reservationInfo.campId],
    queryFn: async () => {
      const res = await fetch(`/api/camp/review/${reservationInfo.campId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    },
  });
  const [ratingIndex, setRatingIndex] = useState(1);
  const [review, handleReview] = useInput()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(ratingIndex);
    console.log(review);
  };

  console.log(campData);
  return (
    <div className={styles.container}>
      <span className={styles['modal-header']}>리뷰 등록</span>
      <button className={styles['close-btn']} onClick={() => onClose()}>
        <ModalCloseSvg />
      </button>
      <div className={styles['camp-container']}>
        <div className={styles['img-wrapper']}>
          <Image
            src={reservationInfo.photo_url}
            width={123}
            height={81}
            alt='camp area photo'
          />
        </div>
        <div className={styles['camp-info-wrapper']}>
          <span className={styles['camp-info-header']}>
            {reservationInfo.campName}
          </span>
          <div className={styles['camp-info-content']}>
            <span>{reservationInfo.campAreaName}</span>
            <span>{reservationInfo.check_in_date}</span>
          </div>
        </div>
      </div>
      <div className={styles['rating-wrapper']}>
        <span className={styles['rating-header']}>별점을 등록해주세요!</span>
        <Rating ratingIndex={ratingIndex} setRatingIndex={setRatingIndex} />
      </div>
      <form className={styles['review-container']} onSubmit={submitHandler}>
        <textarea
          className={styles['review-area']}
          placeholder='이용후기를 남겨주세요.'
          onChange={handleReview}
        ></textarea>
        <button className={styles['submit-btn']}>확인</button>
      </form>
    </div>
  );
};

export default ReviewModal;
