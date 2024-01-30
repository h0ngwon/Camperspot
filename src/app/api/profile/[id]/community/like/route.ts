import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';
import { toast } from 'react-toastify';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('like')
    .select('post_id, post(id, content, post_pic(photo_url), post_hashtag(tag))')
    .eq('user_id', params.id).not('post_id', 'is', null);
  
  if(error) {
    throw new Error('서버 에러가 발생하였습니다!')
  }
  return NextResponse.json(data)
};
