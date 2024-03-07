import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('reservation')
    .select(
      `id,created_at,check_in_date,check_out_date,fee,people,client_name,client_phone,payment_method,camp_area!inner(name,photo_url,camp!inner(id,name,address,check_in,check_out))`,
    )
    .eq('user_id', params.id as string)
    .order('created_at', { ascending: true });
  return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { error } = await supabase
    .from('reservation')
    .delete()
    .eq('id', req.reservationId);

  if (error) {
    return NextResponse.json({
      status: 500,
      message: '에러가 발생하였습니다!',
    });
  }
  return NextResponse.json({
    status: 200,
    message: '예약이 삭제되었습니다!',
  });
};
