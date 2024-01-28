import { NextResponse } from 'next/server';
import { supabase } from '../../db';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  const _keyword = searchParams.get('keyword')!.toString();
  // const region = searchParams.get('region')!.toString()
  const _people = searchParams.get('people')!.toString();
  const _check_in = searchParams.get('check_in')!.toString();
  const _check_out = searchParams.get('check_out')!.toString();

  let { data, error } = await supabase.rpc('search_camp_data', {
    _check_in,
    _check_out,
    _keyword,
    _people,
  });
  if (error) console.error(error);
  else console.log(data);
  return NextResponse.json({ data, error });
}
