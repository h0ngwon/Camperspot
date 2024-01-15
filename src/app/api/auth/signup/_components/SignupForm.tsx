'use client';
import { supabase } from '@/app/api/db';
import { CompanyUserSignUpType } from '@/types/auth';
import { useForm } from 'react-hook-form';
import styles from '../_styles/SignupForm.module.css';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
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
    await supabase
      .from('company_user')
      .insert<Omit<CompanyUserSignUpType, 'confirmPassword'>>({
        email: data.email,
        name: data.name,
        password: data.password,
      });
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
        type='text'
        placeholder='업체명 입력'
        required={true}
        {...register('name', { required: true, maxLength: 20 })}
      />
      {errors?.name?.type === 'required' && <span>업체명을 입력해주세요.</span>}
      <input
        type='password'
        placeholder='비밀번호 입력'
        required={true}
        {...register('password', { required: true, maxLength: 20 })}
      />
      {errors?.password?.type === 'required' && (
        <span>비밀번호를 입력해주세요.</span>
      )}
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
      {errors.confirmPassword && <span> {errors.confirmPassword.message}</span>}

      <input type='submit' value='회원가입' />
    </form>
  );
};

export default SignupForm;
