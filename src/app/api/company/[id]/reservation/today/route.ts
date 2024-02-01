import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('reservation')
    .select(
      `id,client_name,client_phone,created_at,check_in_date,check_out_date,people,camp_area!inner(id,camp_area_name:name,camp!inner(camp_name:name,company_user!inner(id)))`,
    )
    .eq('camp_area.camp.company_user.id', params.id as string)
    .eq('check_in_date', new Date().toDateString())
    .order('created_at', { ascending: true });
  console.log('error', error);
  return NextResponse.json(data);
};
