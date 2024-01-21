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

export const POST = async (req: NextRequest, res: NextResponse) => {
  const userData = await req.json();
  // storage upload -> get url -> db update
  //console.log('body=-=-=-=-=-=-=-=-=-=-=-=-=', await res.json())
  const { error: saveError } = await supabase
    .from('user')
    .update({ nickname: userData.nickname })
    .eq('id', userData.id);
  console.log(userData);

  const { data, error } = await supabase.storage
    .from('profile_pic')
    .upload('test', userData.file);
  console.log(data, error);
  
  return NextResponse.json(saveError);
};
