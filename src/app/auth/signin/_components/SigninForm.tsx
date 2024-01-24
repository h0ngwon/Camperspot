'use client';
import { CompanyUserSigninType } from '@/types/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from '../_styles/SigninForm.module.css';
import Link from 'next/link';

const SigninForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyUserSigninType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<CompanyUserSigninType> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email as string,
      password: data.password as string,
      redirect: false,
      callbackUrl: '/',
    });
    if (res?.error) {
      toast.error('존재하지 않는 유저이거나 비밀번호가 다릅니다!');
    }

    if (res?.ok) {
      toast.success('로그인 완료!');
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles['content-container']}>
        <label>아이디</label>
        <input
          type='email'
          placeholder='예) email@gmail.com'
          required={true}
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
      </div>

      <div className={styles['content-container']}>
        <label>비밀번호</label>
        <input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          required={true}
          {...register('password', { required: true, maxLength: 20 })}
        />
      </div>
      <div className={styles.validation}>
        {errors?.email?.type === 'required' && (
          <span>이메일을 입력해주세요.</span>
        )}
        {errors?.email?.type === 'pattern' && (
          <span>이메일 양식에 맞게 입력해주세요</span>
        )}
        {errors?.password?.type === 'required' && (
          <span>비밀번호를 입력해주세요.</span>
        )}
      </div>
      <button className={styles['login-btn']}>업체회원 로그인</button>
      
    </form>
  );
};

export default SigninForm;
