import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';
import { toast } from 'react-toastify';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('like')
    .select(
      'user_id, camp(id, name, address, camp_pic(camp_id, photo_url), camp_area(camp_id, price))',
    )
    .eq('user_id', params.id as string)
    .not('camp_id', 'is', null);

  if (error) {
    throw new Error('서버 에러가 발생하였습니다!')
  }

  return NextResponse.json(data);
};
