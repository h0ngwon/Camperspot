'use client';
import { CompanyUserSignUpType } from '@/types/auth';
import { useForm } from 'react-hook-form';
import styles from '../_styles/SignupForm.module.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CompanyUserSignUpType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CompanyUserSignUpType) => {
    const userData = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const message = await res.json();

    if (message.status === 409) {
      toast.error(message.message);
    }

    if (message.status === 200) {
      toast.success(message.message);
      router.push('/auth/signin')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles['content-container']}>
        <label>이메일</label>
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
      </div>

      <div className={styles['content-container']}>
        <label>업체명</label>
        <input
          type='text'
          placeholder='업체명 입력'
          required={true}
          {...register('name', { required: true, maxLength: 20 })}
        />
        {errors?.name?.type === 'required' && (
          <span>업체명을 입력해주세요.</span>
        )}
      </div>

      <div className={styles['content-container']}>
        <label>비밀번호</label>
        <input
          type='password'
          placeholder='비밀번호 입력'
          required={true}
          {...register('password', { required: true, maxLength: 20 })}
        />
        {errors?.password?.type === 'required' && (
          <span>비밀번호를 입력해주세요.</span>
        )}
      </div>

      <div className={styles['content-container']}>
        <label>비밀번호 확인</label>
        <input
          type='password'
          placeholder='비밀번호 확인'
          required={true}
          {...register('confirmPassword', {
            required: true,
            maxLength: 20,
            validate: {
              matchPassword: (value) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다';
              },
            },
          })}
        />
        {errors.confirmPassword && (
          <span> {errors.confirmPassword.message}</span>
        )}
      </div>
      <button
        className={
          errors.email || errors.name || errors.confirmPassword || errors.password
            ? `${styles['signup-btn-disable']} ${styles['disabled-cursor']}`
            : styles['signup-btn']
        }
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
