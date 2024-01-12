import React from 'react';
import Control from './_com/Control';
const data = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];
//서버에서 가능한 매개변수 가져오기
function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //?? nullish coalescing 변수값이 null이나 undefined일때 기본값제공
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '5';

  const start = (Number(page) - 1) * Number(per_page); //0,5,10...
  const end = start + Number(per_page);
  //데이터를 5개씩 자름
  const entiries = data.slice(start, end);
  console.log(entiries);
  return (
    <div>
      페이지네이션 연습 페이지
      {entiries.map((a) => (
        <p key={a}>{a}</p>
      ))}
      {/**데이터전체를 props받아서 쓰는건? */}
      <Control hasNextPage={end < data.length} hasPrevPage={start > 0} />
    </div>
  );
}

export default page;
