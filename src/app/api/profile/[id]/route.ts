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
  return NextResponse.json(repository.data);
};

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  // // storage upload -> get url -> db update
  const userData = await req.formData();

  const { error: saveError } = await supabase
    .from('user')
    .update({ nickname: userData.get('nickname') as string })
    .eq('id', params.id);

  if (saveError) {
    throw new Error(saveError.message);
  }

  const { data, error: storageError } = await supabase.storage
    .from('profile_pic')
    .upload(`profile/${params.id}`, userData.get('file') as File, {
      upsert: true,
    });

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: url } = await supabase.storage
    .from('profile_pic')
    .getPublicUrl(`profile/${params.id}`);

  const { error: profileUpdateError } = await supabase
    .from('user')
    .update({ profile_url: url.publicUrl })
    .eq('id', params.id);
  if (profileUpdateError) throw new Error(profileUpdateError.message);

  const repository = await supabase
    .from('user')
    .select('email, nickname, profile_url, provider')
    .eq('id', params.id)
    .single();
  return NextResponse.json(repository.data);
  // return NextResponse.json(saveError);
};
