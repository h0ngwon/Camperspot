'use client';
import { Tables } from '@/types/supabase';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../_styles/SigninForm.module.css';

type SigninType = Pick<Tables<'company_user'>, 'email' | 'password'>;

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SigninType> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <input
        type='email'
        placeholder='이메일 입력'
        required={true}
        {...register('email', {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
      />
      {errors?.email?.type === 'required' && (
        <span>이메일을 입력해주세요.</span>
      )}
      {errors?.email?.type === 'pattern' && (
        <span>이메일 양식에 맞게 입력해주세요</span>
      )}
      <input
        type='password'
        placeholder='비밀번호 입력'
        required={true}
        {...register('password', { required: true, maxLength: 20 })}
      />
      {errors?.password?.type === 'required' && (
        <span>비밀번호를 입력해주세요.</span>
      )}
      <input type='submit' value='로그인' />
    </form>
  );
};

export default SigninForm;
