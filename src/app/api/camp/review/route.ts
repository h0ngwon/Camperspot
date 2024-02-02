import { Review } from './../../../../types/supabaseSchema';
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../db';

type InsertReviewType = Pick<Review, 'content' | 'rating' | 'camp_id' | 'user_id'>;

export const GET = async () => {

}

export const POST = async (req: NextRequest) => {
  const userData = await req.json();
  const {error} = await supabase.from('review').insert<InsertReviewType>({
    content: userData.review,
    rating: userData.rate,
    user_id: userData.userId,
    camp_id: userData.campId,
  })
  
  if(error) {
    return NextResponse.json({
      status: 500,
      message: '에러가 발생하였습니다!'
    })
  }

  return NextResponse.json({
    status: 200,
    message: '리뷰가 등록되었습니다!'
  })
}