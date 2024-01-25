import { NextResponse } from 'next/server';
import { supabase } from '../../db';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  //   const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get('keyword');
  const region = searchParams.get('region');
  const check_in = searchParams.get('check_in');
  const check_out = searchParams.get('check_out');
  const people = searchParams.get('people');
  const sort = searchParams.get('sort');
  console.log('#$$$$$$$$$$$$$$$$$$$$', keyword);

  const query = supabase.from('camp').select(
    `
        id,
        name,
        created_at,
        address,
        
        camp_area!inner(id,price),
        camp_pic(id,photo_url),
        hashtag:hashtag!inner(tag),
        camp_facility(facility(option))
        `,
    { count: 'exact' },
  );
  if (region) {
    query.ilike('region', `%${region}%`);
  }
  if (keyword && people) {
    query
      // .or(
      //   `name.ilike.%${keyword}%,hashtag.tag.ilike.%${keyword}%`,
      // )
      // .ilike('hashtag.tag', `%${keyword}%`)

      .or(`name.ilike.%${keyword}%,region.ilike.%${keyword}%`)
      // .or(`name.ilike.%${keyword}%`)
      // .or(`hashtag.tag.ilike.%${keyword}%`)
      .gte('camp_area.max_people', `${Number(people)}`);
  }

  const { data: camp, error, count } = await query;
  console.log(camp);
  return NextResponse.json({ camp, count, error });
}
