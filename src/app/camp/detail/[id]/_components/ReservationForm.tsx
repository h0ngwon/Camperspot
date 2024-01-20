'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '../_styles/ReservationForm.module.css';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { supabase } from '@/app/api/db';
import { useState } from 'react';
import ConfirmModal from '@/app/_components/ConfirmModal';
import AlertModal from '@/app/_components/AlertModal';
import { Tables } from '@/types/supabase';
import { ReservationInfo } from '@/types/reservation';
import { Calendar } from './Calendar';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';

type UserInfo = { people: number; name: string; phone: string };
type Reservation = Tables<'reservation'>;

const ReservationForm = ({ reservation }: { reservation: ReservationInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInfo>({
    defaultValues: { people: 1, name: '', phone: '' },
    mode: 'onChange',
  });
  const currentDate = new Date();
  const methods = ['카카오페이', '휴대폰', '카드', '실시간 계좌이체'];
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const [dates, setDates] = useState<[Date, Date]>([
    new Date(currentDate.setHours(0, 0, 0, 0)),
    new Date(
      currentDate?.getFullYear()!,
      currentDate?.getMonth()!,
      currentDate?.getDate()! + 1,
    ),
  ]);
  const [nights, setNights] = useState<number>(1);
  const toggleActive = (selectMethod: number) => {
    if (isActive == selectMethod) setIsActive(null);
    else setIsActive(selectMethod);
  };

  const params = useSearchParams();
  const campAreaId = params.get('id');

  const { max_people, price, name } = reservation!;
  const { check_in, check_out } = reservation?.camp!;
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<UserInfo> = async (userInfo) => {
    const { data, error } = await supabase
      .from('reservation')
      .insert({
        check_in_date: dates[0],
        check_out_date: dates[1],
        client_name: userInfo.name,
        client_phone: userInfo.phone,
        fee: price * nights,
        user_id: session?.user.id,
        people: userInfo.people,
        camp_area_id: campAreaId,
        payment_method: methods[isActive!],
      })
      .select();
    if (data) {
      setIsOpenComplete(true);
      console.log('데이터 등록 완료!');
    }
    if (error) console.log('error', error);
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(onSubmit)} className={styles.form}>
        <div>
          인원
          <input
            type='number'
            id='people'
            {...register('people', {
              required: '인원 수를 입력해주세요',
              min: 1,
              max: {
                value: max_people,
                message: `최대 인원 ${max_people}명 이하로 입력해주세요`,
              },
            })}
          />
        </div>
        {errors.people && (
          <div className={styles.errors}>
            <p>{errors.people.message}</p>
          </div>
        )}
        <Calendar
          onDatesChange={(dates) => {
            setDates(dates);
            setNights(
              Math.abs(dates[1]?.getTime() - dates[0]?.getTime()) /
                (1000 * 60 * 60 * 24),
            );
          }}
        />
        {dates[0] && dates[1] && (
          <div className={styles.dates}>
            일시
            <p>
              {dates?.[0].toLocaleDateString()}
              <p>체크인 {check_in} ~ </p>
            </p>
            <IoIosArrowForward size={25} />
            <p>
              {dates?.[1].toLocaleDateString()}
              <p>체크아웃 ~ {check_out} </p>
            </p>
          </div>
        )}

        <div className={styles.divider}></div>

        <div className={styles.prices}>
          <p className={styles.total}>
            예약 금액{' '}
            <span>
              {nights
                ? (price * nights).toLocaleString()
                : price.toLocaleString()}
              원
            </span>
          </p>
          <p className={styles.total}>
            총 결제 금액{' '}
            <span className={styles.price}>
              {nights
                ? (price * nights).toLocaleString()
                : price.toLocaleString()}
              원
            </span>
          </p>
        </div>
        <div className={styles.payInfo}>
          <h3 className={styles.h3}>결제 정보</h3>
          <div className={styles.personInfo}>
            <div>
              <label htmlFor='userName'>예약자명 </label>
              <input
                className={styles.input}
                type='text'
                id='userName'
                {...register('name', {
                  required: '예약자 명을 입력해주세요',
                  pattern: {
                    value: NAME_REGEX,
                    message: '예약자 이름은 2자이상 16자 이하만 가능합니다.',
                  },
                })}
                placeholder='이름을 입력해주세요'
              />
            </div>
            {errors.name && (
              <div className={styles.errors}>
                <p>{errors.name.message}</p>
              </div>
            )}
            <div>
              <label htmlFor='phone'>연락처 </label>
              <input
                className={styles.input}
                type='text'
                id='phone'
                {...register('phone', {
                  required: '휴대폰번호를 입력해주세요.',
                  pattern: {
                    value: PHONE_REGEX,
                    message: '010-1234-5678 형식으로 입력해주세요',
                  },
                })}
                placeholder='예시) 010-1234-5678'
              />
            </div>
          </div>
          {errors.phone && (
            <div className={styles.errors}>
              <p>{errors.phone.message}</p>
            </div>
          )}
          <div className={styles.method}>
            <p>결제 수단</p>
            <ul className={styles.ul}>
              {methods.map((method, idx) => (
                <li
                  key={idx}
                  className={isActive == idx ? styles.selected : styles.li}
                  onClick={() => toggleActive(idx)}
                >
                  {method}
                </li>
              ))}
            </ul>
            <button
              type='button'
              className={styles.button}
              disabled={!isValid || isActive === null}
              onClick={() => setIsOpenConfirm(true)}
            >
              결제하기
            </button>
          </div>
        </div>
      </form>

      <ConfirmModal
        title='예약을 하시겠습니까?'
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={() => handleSubmit(onSubmit)()}
      />
      {/* 확인 모달창 닫고 예약 데이터 추가된 후 알림창 띄워주기  */}
      {!isOpenConfirm && isOpenComplete && (
        <AlertModal title='예약이 완료되었습니다' />
      )}
    </>
  );
};

export default ReservationForm;
