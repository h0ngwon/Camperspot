import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const searchParam = Number(req.nextUrl.searchParams.get('page'));
  const from = searchParam * 3;
  const to = searchParam + 3;
  const { data, error } = await supabase
    .from('post')
    .select(
      'id, content, post_pic(photo_url), post_hashtag(tag), like(id), comment(id)',
    )
    .order('created_at', { ascending: false })
    .eq('user_id', params.id)
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json(data);
};
