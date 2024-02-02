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
      `id,client_name,client_phone,created_at,check_in_date,check_out_date,fee,payment_method,people,camp_area!inner(id,name,camp!inner(name,check_in,check_out,company_user!inner(id)))`,
    )
    .eq('camp_area.camp.company_user.id', params.id as string)
    .gte('check_in_date', startDate)
    .lte('check_in_date', endDate)
    .order('created_at', { ascending: true });
  console.log('error', error);
  return NextResponse.json(data);
};
