import { supabase } from '@/app/api/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data, error } = await supabase
    .from('post')
    .select(
      'id, content, post_pic(photo_url), post_hashtag(tag), like(id), comment(id)',
    )
    .eq('user_id', params.id);

  if (error) {
    throw new Error(error.message);
  }
  
  return NextResponse.json(data);
};
