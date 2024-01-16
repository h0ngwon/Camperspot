// export async function GET(request: Request) {
//   const data = await request.json();
//   console.log('data', data);

import { NextResponse } from 'next/server';
import { supabase } from '../db';

//   // await supabaseForServer
//   //   .from("books")
//   //   .insert({ name: "foo", authorName: "bar" });
//   return Response.json('hello world');
// }

export async function GET() {
  const { data: camp, error } = await supabase.from('camp').select(`
    name,
    created_at,
    address,
    region,

    camp_area(price),
    camp_pic(photo_url),
    hashtag(tag)
    `);

  return NextResponse.json({ camp });
  console.log(error);
}

//rest API구현
//json server역활을 대신
//http://localhost:3000/api/camp 이거 자체가 서버다.

//근데 지금 서버가 있는상태(수파)에서 이 서버를 쓸 필요가 있는가?
//route handler => client에서 받으면? 서버의 역활
//반면 servercomponent에서 받으면?

//로그인한유저 => 예약 변경 수정 권한
/**직접부여서 수정하면 안되는 곳도 수정할 우려
 * 필요한 정보만
 * 민감한 데이터
예약 수정로직
rls policy 로그인유무 


이벤트가 발생 후 서버와 통신이 이루어질떄

next와 reactquery
next의 캐싱 => ssr.

client쪽에서는 어떻게 캐싱?

ex)캠핑장 3000개 ssr하면 너무 많음
페이지네이션 =>10개. 나머지는 스크롤마다 클라이언트쪽에서 불러오기
=> 쿼리!


*/
