'use client';

import React, { FormEvent, useState } from 'react';
import styles from '../_styles/ReviewModal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReviewInfo } from '@/types/reservation';
import Image from 'next/image';
import useInput from '@/hooks/useInput';

type Props = {
  reservationInfo: ReviewInfo;
  onClose: () => void;
};

const ReviewModal = ({ reservationInfo, onClose }: Props) => {
  const arrayIndex = [1, 2, 3, 4, 5];
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
  const [review, handleReview] = useInput();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

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
            alt='캠프 존 사진'
            priority={true}
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
      <form className={styles['review-container']} onSubmit={submitHandler}>
        <div className={styles['rating-wrapper']}>
          <span className={styles['rating-header']}>별점을 등록해주세요!</span>
          <div className={styles['rating-container']}>
            <div className={styles['stars-container']}>
              <fieldset className={styles['stars-wrapper']}>
                <input
                  type='radio'
                  name='rating'
                  id={`${arrayIndex[4]}`}
                ></input>
                <label
                  htmlFor={`${arrayIndex[4]}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex[4])}
                >
                  ⭐️
                </label>
                <input
                  type='radio'
                  name='rating'
                  id={`${arrayIndex[3]}`}
                ></input>
                <label
                  htmlFor={`${arrayIndex[3]}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex[3])}
                >
                  ⭐️
                </label>
                <input
                  type='radio'
                  name='rating'
                  id={`${arrayIndex[2]}`}
                ></input>
                <label
                  htmlFor={`${arrayIndex[2]}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex[2])}
                >
                  ⭐️
                </label>
                <input
                  type='radio'
                  name='rating'
                  id={`${arrayIndex[1]}`}
                ></input>
                <label
                  htmlFor={`${arrayIndex[1]}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex[1])}
                >
                  ⭐️
                </label>
                <input
                  type='radio'
                  name='rating'
                  id={`${arrayIndex[0]}`}
                ></input>
                <label
                  htmlFor={`${arrayIndex[0]}`}
                  className={styles['stars']}
                  onClick={() => setRatingIndex(arrayIndex[0])}
                >
                  ⭐️
                </label>
              </fieldset>
            </div>
            <div className={styles.rating}>{ratingIndex}</div>
          </div>
        </div>
        <textarea
          className={styles['review-area']}
          placeholder='이용후기를 남겨주세요. (150자 이하)'
          onChange={handleReview}
          maxLength={150}
        ></textarea>
        <button className={styles['submit-btn']}>확인</button>
      </form>
    </div>
  );
};

export default ReviewModal;
