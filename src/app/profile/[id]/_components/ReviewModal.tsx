'use client';

import ModalCloseSvg from '@/components/ModalCloseSvg';
import { ReviewInfo } from '@/types/reservation';
import { FormReviewType } from '@/types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addReview, getReview } from '../_lib/review';
import styles from '../_styles/ReviewModal.module.css';
import { toast } from 'react-toastify';
import useModalStore from '@/store/modal';

type Props = {
  reservationInfo: ReviewInfo;
  onClose: () => void;
};

const ReviewModal = ({ reservationInfo, onClose }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormReviewType>();
  const [rate, setRate] = useState<number>(1);
  const { toggleModal } = useModalStore();
  const arrayIndex = [5, 4, 3, 2, 1];
  const params = useParams();
  const userId = params.id as string;
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const submitHandler = (data: FormReviewType) => {
    const review = data.review.trim();
    const campId = reservationInfo.campId;

    mutation.mutate({ rate, review, userId, campId });
    toast.success('리뷰를 등록했습니다!');
    toggleModal();
  };

  return (
    <>
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
              objectFit='cover'
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
            <span className={styles['rating-header']}>
              별점을 등록해주세요!
            </span>
            <div className={styles['rating-container']}>
              <div className={styles['stars-container']}>
                <fieldset className={styles['stars-wrapper']}>
                  {arrayIndex.map((index) => (
                    <React.Fragment key={index}>
                      <input
                        type='radio'
                        id={`${index}`}
                        value={arrayIndex[index]}
                        {...register('rating', { required: true })}
                      ></input>
                      <label
                        htmlFor={`${index}`}
                        className={styles['stars']}
                        onClick={() => setRate(index)}
                      >
                        ⭐️
                      </label>
                    </React.Fragment>
                  ))}
                </fieldset>
              </div>
              <div className={styles.rating}>{rate}</div>
            </div>
          </div>
          <div className={styles['review-wrapper']}>
            <textarea
              id='review'
              placeholder='이용후기를 남겨주세요. (150자 이하)'
              className={styles['review-area']}
              {...register('review', {
                minLength: 1,
                maxLength: 150,
                required: true,
                validate: (value) => (value.trim().length >= 1 ? true : false),
              })}
            ></textarea>
            {errors.review || errors.rating ? (
              <p className={styles.error}>
                리뷰와 별점을 입력해주세요! (공백X)
              </p>
            ) : null}
          </div>
          <button className={styles['submit-btn']}>리뷰 등록</button>
        </form>
      </div>
    </>
  );
};

export default ReviewModal;
