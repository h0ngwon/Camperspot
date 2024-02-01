import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const startDate = request.nextUrl.searchParams.get('startDate');
  const endDate = request.nextUrl.searchParams.get('endDate');
  const { data, error } = await supabase
    .from('reservation')
    .select(
      `id,client_name,client_phone,created_at,check_in_date,check_out_date,people,camp_area!inner(id,camp_area_name:name,camp!inner(camp_name:name,company_user!inner(id)))`,
    )
    .eq('camp_area.camp.company_user.id', params.id as string)
    // 한달 단위로 예약 정보 데이터 가져오기
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: true });
  console.log('error', error);
  return NextResponse.json(data);
};
