'use client';
import { CompanyUserSigninType } from '@/types/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from '../_styles/SigninForm.module.css';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

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
      callbackUrl: '/'
    });
    if (res?.error) {
      toast.error('존재하지 않는 유저이거나 비밀번호가 다릅니다!');
    }

    if (res?.ok) {
      toast.success('로그인 완료!')
      router.push('/')
    }
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
