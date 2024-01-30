import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('like')
    .select(
      'user_id, camp(id, name, address, camp_pic(id, photo_url), camp_area(id, price))',
    )
    .eq('user_id', params.id as string);

  if (error) throw new Error(error.message);

  return NextResponse.json(data);
};
