'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '../_styles/ReservationForm.module.css';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { supabase } from '@/app/api/db';
import { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { ReservationInfo } from '@/types/reservation';
import { Calendar } from './Calendar';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import ReservationArrowSvg from '@/components/ReservationArrowSvg';
import KakaoPaySvg from '../_svg/KakaoPaySvg';
import CompleteModal from './CompleteModal';
import useModalStore from '@/store/modal';

type UserInfo = {
  people: number;
  name: string;
  phone: string;
  dates: [Date, Date];
};

const ReservationForm = ({ reservation }: { reservation: ReservationInfo }) => {
  const currentDate = new Date();
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInfo>({
    defaultValues: {
      people: 2,
      name: '',
      phone: '',
      dates: [
        new Date(currentDate.setHours(0, 0, 0, 0)),
        new Date(
          currentDate?.getFullYear()!,
          currentDate?.getMonth()!,
          currentDate?.getDate()! + 1,
        ),
      ],
    },
    mode: 'onChange',
  });
  const dates = watch('dates');

  const methods = ['카카오페이', '카드', '휴대폰', '실시간 계좌이체'];
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const [nights, setNights] = useState<number>(1);
  const toggleActive = (selectMethod: number) => {
    if (isActive == selectMethod) setIsActive(null);
    else setIsActive(selectMethod);
  };

  const params = useSearchParams();
  const campAreaId = params.get('id') as string;
  const { max_people, price, name } = reservation!;
  const { check_in, check_out } = reservation?.camp!;
  const { data: session } = useSession();
  const { toggleModal } = useModalStore();

  const onSubmit: SubmitHandler<UserInfo> = async (userInfo) => {
    const { data, error } = await supabase
      .from('reservation')
      .insert({
        camp_area_id: campAreaId,
        check_in_date: dates[0].toDateString(),
        check_out_date: dates[1].toDateString(),
        client_name: userInfo.name,
        client_phone: userInfo.phone.replace(
          /(\d{3})(\d{3,4})(\d{4})/,
          '$1-$2-$3',
        ),
        fee: price * nights,
        payment_method: methods[isActive!],
        people: userInfo.people,
        user_id: session?.user?.id as string,
      })
      .select();
    if (data) {
      setIsOpenComplete(true);
    }
    if (error) console.log('error', error);
  };
  const handleCloseModal = () => {
    setIsOpenComplete(false);
    toggleModal();
  };

  useEffect(() => {
    if (dates?.length > 0) {
      setNights(
        (dates[1]?.getTime() - dates[0]?.getTime()) / (1000 * 60 * 60 * 24),
      );
    }
  }, [dates]);

  return (
    <>
      <form onSubmit={() => handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles['reservation-info']}>
          <div>
            <span className={styles.span}>인원</span>
            <input
              className={styles['people-count']}
              type='number'
              id='people'
              {...register('people', {
                required: '인원 수를 입력해주세요',
                min: {
                  value: 1,
                  message: '최소 1명 이상 입력해주세요',
                },
                max: {
                  value: max_people,
                  message: `최대 인원 ${max_people}명 이하로 입력해주세요`,
                },
              })}
            />
            명
          </div>
          {errors.people && (
            <div className={styles['people-errors']}>
              <p>{errors.people.message}</p>
            </div>
          )}
          <div>
            <span className={styles.span}>날짜</span>
            <Calendar control={control} />
          </div>

          {dates?.[0] && dates?.[1] && (
            <div className={styles.div}>
              <span className={styles.span}>일시</span>
              <div className={styles.dates}>
                <div>
                  <span className={styles.date}>
                    {dates?.[0]
                      .toLocaleString('ko', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'narrow',
                      })
                      .replace(/\.\s*\((.)\)$/, ' ($1)')}
                  </span>

                  <p className={styles.hour}>체크인 {check_in} ~</p>
                </div>
                <ReservationArrowSvg />
                <div>
                  <p className={styles.date}>
                    {dates?.[1]
                      .toLocaleString('ko', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        weekday: 'narrow',
                      })
                      .replace(/\.\s*\((.)\)$/, ' ($1)')}
                  </p>
                  <p className={styles.hour}>체크아웃 ~ {check_out}</p>
                </div>
              </div>
            </div>
          )}
        </div>
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
          <p className={styles.total2}>
            총 결제 금액{' '}
            <span className={styles.price}>
              {nights
                ? (price * nights).toLocaleString()
                : price.toLocaleString()}
              원
            </span>
          </p>
        </div>
        <div className={styles['vertical-divider']}></div>
        <div className={styles['person-info']}>
          <h3 className={styles.h3}>예약자 정보</h3>
          <div className={styles.info}>
            <label htmlFor='userName'>*예약자명 </label>
            <input
              className={styles.input}
              type='text'
              id='userName'
              {...register('name', {
                required: '예약자명을 입력해주세요.',
                pattern: {
                  value: NAME_REGEX,
                  message: '예약자 이름은 2자이상 16자 이하만 가능합니다.',
                },
              })}
              placeholder='실명을 입력해주세요.'
            />
          </div>
          {errors.name && (
            <div className={styles.errors}>
              <p>{errors.name.message}</p>
            </div>
          )}
          <div className={styles.info}>
            <label htmlFor='phone'>*전화번호 </label>
            <input
              className={styles.input}
              type='text'
              id='phone'
              {...register('phone', {
                required: '휴대폰번호를 입력해주세요.',

                pattern: {
                  value: PHONE_REGEX,
                  message: '010-1234-5678 형식으로 입력해주세요.',
                },
              })}
              placeholder='예시) 010-1234-5678'
            />
          </div>

          {errors.phone && (
            <div className={styles.errors}>
              <p>{errors.phone.message}</p>
            </div>
          )}
        </div>
        <div className={styles.method}>
          <h3 className={styles.h3}>결제수단 선택</h3>
          <ul className={styles.ul}>
            {methods.map((method, idx) => (
              <li
                key={idx}
                className={`${styles.li} ${
                  isActive == idx ? styles.selected : ''
                }`}
                onClick={() => toggleActive(idx)}
              >
                {method === '카카오페이' ? <KakaoPaySvg /> : method}
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
      </form>
      <ConfirmModal
        title='정말로 예약하시겠습니까?'
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={() => handleSubmit(onSubmit)()}
      />
      {!isOpenConfirm && isOpenComplete && (
        <CompleteModal
          title='예약이 완료되었습니다.'
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ReservationForm;
