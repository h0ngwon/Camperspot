'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ReservationForm.module.css';

type UserInfo = { name: string; phone: string };
const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserInfo>();
  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    console.log(data);
  };
  return (
    <>
      <h3 className={styles.h3}>결제 정보</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor='userName'>예약자 명</label>
        <input
          type='text'
          id='userName'
          {...register('name')}
          placeholder='이름을 입력해주세요'
        />
        <label htmlFor='phone'>연락처</label>
        <input
          type='text'
          id='phone'
          {...register('phone')}
          placeholder='예시) 01012345678'
        />
        <div>
          <p>결제 수단</p>
          <ul className={styles.ul}>
            <li className={styles.li}>카카오페이</li>
            <li className={styles.li}>휴대폰 결제</li>
            <li className={styles.li}>신용/카드 결제</li>
            <li className={styles.li}>법인카드</li>
          </ul>
          <button className={styles.button}>결제하기</button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
