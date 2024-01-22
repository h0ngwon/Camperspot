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
  const userData = await req.formData();
  console.log(userData.get('file'))

  // const userData = await req.json();
  // console.log(req.body);
  // console.log(userData)
  // // storage upload -> get url -> db update
  // const { error: saveError } = await supabase
  //   .from('user')
  //   .update({ nickname: userData.nickname })
  //   .eq('id', userData.id);
  // console.log(userData);

  const { data, error } = await supabase.storage
    .from('profile_pic')
    .upload(`profile/${params.id}`, userData.get('file') as File, {
      upsert: true,
    });
  console.log(data, error);

  return NextResponse.json(true);
  // return NextResponse.json(saveError);
};
