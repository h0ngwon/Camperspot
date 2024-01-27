import { NextResponse } from 'next/server';
import { supabase } from '../../db';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const region = searchParams.get('region');
  const people = searchParams.get('people');

  const query = supabase.from('camp').select(
    `
        id,
        name,
        created_at,
        address,
        
        camp_area!inner(id,price),
        camp_pic(id,photo_url),
        hashtag(tag),
        camp_facility(facility(option))
        `,
  );
  if (region) {
    await query.ilike('region', `%${region}%`);
  }
  if (keyword && people) {
    if (keyword === '*') {
      const { data: camp, error } = await query;
      return NextResponse.json({ camp, error });
    }
    await query
      .or(`name.ilike.%${keyword}%,region.ilike.%${keyword}%`)
      .gte('camp_area.max_people', `${Number(people)}`);
  }

  const { data: camp, error } = await query;
  return NextResponse.json({ camp, error });
}
