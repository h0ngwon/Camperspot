import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string, page: number } },
) => {
  const page = params.page;
  const from = page * 4; // 0 4 8 12
  const to = page + 3; // 3 7 11
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
