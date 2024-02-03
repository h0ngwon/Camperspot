
import { NextRequest, NextResponse } from 'next/server';
import { Review } from '@/types/supabaseSchema';
import { supabase } from '@/app/api/db';

type InsertReviewType = Pick<
  Review,
  'content' | 'rating' | 'user_id' | 'camp_id'
>;

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const {data, error} = await supabase.from('review').select('*').eq('camp_id', params.id)
  
  if(error) {
    return NextResponse.json({
      status: 500,
      message: '에러가 발생하였습니다!'
    })
  }
  return NextResponse.json(data);
};

export const POST = async (
  req: NextRequest,
) => {
  const userData = await req.json();
  const { error } = await supabase.from('review').insert<InsertReviewType>({
    content: userData.review,
    rating: userData.rate,
    user_id: userData.userId,
    camp_id: userData.campId,
  });

  if (error) {
    return NextResponse.json({
      status: 500,
      message: '에러가 발생하였습니다!',
    });
  }

  return NextResponse.json({
    status: 200,
    message: '리뷰가 등록되었습니다!',
  });
};
