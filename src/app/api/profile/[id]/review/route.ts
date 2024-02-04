import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('review')
    .select('id, created_at, rating, content, camp(name)')
    .eq('user_id', params.id);

  if (error) {
    throw new Error('에러가 발생하였습니다.');
  }

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const userRequest = await req.json();
  const { error } = await supabase
    .from('review')
    .delete()
    .eq('id', userRequest.reviewId);

  if (error) {
    throw new Error('에러가 발생하였습니다!');
  }

  return NextResponse.json({
    status: 201,
    message: '리뷰가 삭제되었습니다.',
  });
};
