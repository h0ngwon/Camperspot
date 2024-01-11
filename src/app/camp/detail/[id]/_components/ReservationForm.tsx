'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ReservationForm.module.css';
import { NAME_REGEX, PHONE_REGEX } from '@/app/utils/regex';

type UserInfo = { name: string; phone: string };
const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors, isValid },
  } = useForm<UserInfo>({
    defaultValues: { name: '', phone: '' },
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    console.log(data);
    //이제 여기서 데이터 추가할 예정!
  };
  return (
    <>
      <h3 className={styles.h3}>결제 정보</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <li className={styles.li}>카카오페이</li>
            <li className={styles.li}>휴대폰 결제</li>
            <li className={styles.li}>신용/카드 결제</li>
            <li className={styles.li}>법인카드</li>
          </ul>
          <button className={styles.button} disabled={!isValid}>
            결제하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
