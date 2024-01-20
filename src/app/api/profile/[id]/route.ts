import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../db';

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  const repository = await supabase
    .from('user')
    .select('email, nickname, profile_url, provider')
    .eq('id', params.id)
    .single();
    console.log(repository);
  return NextResponse.json(repository.data);
};

export const POST = async (id: string) => {
  const repository = await supabase.from('user')
}