'use client';

import React, { FormEvent, useState } from 'react';
import styles from '../_styles/ReviewModal.module.css';
import ModalCloseSvg from '@/components/ModalCloseSvg';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReviewInfo } from '@/types/reservation';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import { useForm } from 'react-hook-form';

type Props = {
  reservationInfo: ReviewInfo;
  onClose: () => void;
};

type ReviewType = {
  rating?: number;
  review: string;
};

const ReviewModal = ({ reservationInfo, onClose }: Props) => {
  const arrayIndex = [5, 4, 3, 2, 1];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReviewType>();
  const [ratingIndex, setRatingIndex] = useState<number>(1);
  const [review, handleReview] = useInput();
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

  const submitHandler = (data: ReviewType) => {
    console.log(data.rating);
    console.log(data.review);
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
      <form
        className={styles['review-container']}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={styles['rating-wrapper']}>
          <span className={styles['rating-header']}>별점을 등록해주세요!</span>
          <div className={styles['rating-container']}>
            <div className={styles['stars-container']}>
              <fieldset className={styles['stars-wrapper']}>
                {arrayIndex.map((index) => (
                  <React.Fragment key={index}>
                    <input
                      type='radio'
                      id={`${index}`}
                      required={true}
                      {...register('rating', { required: true })}
                    ></input>
                    <label
                      htmlFor={`${index}`}
                      className={styles['stars']}
                      onClick={() => setRatingIndex(index)}
                    >
                      ⭐️
                    </label>
                  </React.Fragment>
                ))}
              </fieldset>
            </div>
            <div className={styles.rating}>{ratingIndex}</div>
          </div>
        </div>
        <textarea
          id='review'
          className={styles['review-area']}
          placeholder='이용후기를 남겨주세요. (150자 이하)'
          {...register('review', {
            maxLength: 150,
            required: true,
          })}
        ></textarea>
        <button className={styles['submit-btn']}>확인</button>
      </form>
    </div>
  );
};

export default ReviewModal;
