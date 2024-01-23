import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../db';
import { CompanyUserSignUpType } from '@/types/auth';

export const POST = async (req: NextRequest) => {
  const userData = await req.json();

  const { data, error } = await supabase
    .from('company_user')
    .select('email')
    .eq('email', userData.email)
    .single();

  if (data) {
    console.log(data);
    return NextResponse.json({
      status: 409,
      message: '이미 가입되어있는 이메일 입니다!',
    });
  }

  const { error: saveError } = await supabase
    .from('company_user')
    .insert<Omit<CompanyUserSignUpType, 'confirmPassword'>>(userData);

  if (saveError) {
    return NextResponse.json({
      status: saveError.code,
      message: '회원가입에 실패하였습니다!',
    });
  }

  return NextResponse.json({ status: 200, message: '회원가입 완료!' });
};
