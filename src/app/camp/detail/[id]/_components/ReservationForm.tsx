'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '../_styles/ReservationForm.module.css';
import { NAME_REGEX, PHONE_REGEX } from '@/app/_utils/regex';
import { supabase } from '@/app/api/db';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ConfirmModal from '@/app/_components/ConfirmModal';
import AlertModal from '@/app/_components/AlertModal';
import { Tables } from '@/types/supabase';
import { ReservationInfo } from '@/types/reservation';
import { Calendar } from './Calendar';

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
  const methods = ['카카오페이', '휴대폰', '카드', '실시간 계좌이체'];
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isOpenComplete, setIsOpenComplete] = useState<boolean>(false);
  const [dates, setDates] = useState<[Date, Date]>([new Date(), new Date()]);
  const [nights, setNights] = useState<number>(1);
  const toggleActive = (selectMethod: number) => {
    if (isActive == selectMethod) setIsActive(null);
    else setIsActive(selectMethod);
  };

  const { max_people, price, name } = reservation?.[0]!;
  const { check_in, check_out } = reservation?.[0].camp!;

  const onSubmit: SubmitHandler<UserInfo> = async (userInfo) => {
    // const { id } = reservation?.[0].camp_area!;
    // const { data, error } = await supabase
    //   .from('reservation')
    //   .insert<Omit<Reservation, 'created_at'>>({
    //     // 추가 테스트할 경우 다른 uuid로 변경해야함.  (나중에 미래님꺼 받으면 uuid로 변경할 예정)
    //     id: uuidv4(),
    //     client_name: userInfo.name,
    //     client_phone: userInfo.phone,
    //     fee,
    //     // 나중에 로그인한 사용자 유저 아이디로 변경 예정
    //     user_id: '3a0a96f1-ea9b-480c-9ad4-c4d8756697d6',
    //     check_in_date,
    //     check_out_date,
    //     people,
    //     camp_area_id: id,
    //     payment_method: methods[isActive!],
    //   })
    //   .select();
    // if (data) {
    //   setIsOpenComplete(true);
    //   console.log('데이터 등록 완료!');
    // }
    // if (error) console.log('error', error);
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(onSubmit)} className={styles.form}>
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
        {errors.people && (
          <div className={styles.errors}>
            <p>{errors.people.message}</p>
          </div>
        )}
        <div>
          <p>
            일시
            <span>
              체크인 {check_in}~ 체크아웃 {check_out}
            </span>
            <Calendar
              onDatesChange={(dates) => {
                setDates(dates);
                setNights(
                  Math.abs(dates[1]?.getTime() - dates[0]?.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
              }}
            />
          </p>
        </div>
        <p>
          예약 금액 <span>{nights ? price * nights : price}원</span>
        </p>
        <p>
          총 결제 금액 <span>{nights ? price * nights : price}원</span>
        </p>
        <h3 className={styles.h3}>결제 정보</h3>
        <label htmlFor='userName'>예약자 명</label>
        <input
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
        {errors.name && (
          <div className={styles.errors}>
            <p>{errors.name.message}</p>
          </div>
        )}
        <label htmlFor='phone'>연락처</label>
        <input
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
        {errors.phone && (
          <div className={styles.errors}>
            <p>{errors.phone.message}</p>
          </div>
        )}
        <div>
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
