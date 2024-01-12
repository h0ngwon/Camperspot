import { GET } from '@/app/api/camp/route';
import axios from 'axios';
import React from 'react';

async function page() {
  //   const a = await axios.get(`http://localhost:3000/api/camp`);

  const a = await fetch(`http://localhost:3000/api/camp`, { method: 'GET' });
  console.log(a);
  const { camp } = await a.json();
  console.log(camp);
  return (
    // <div>안녕</div>
    <div>{camp?.map((a: any) => a.name)}</div>
  );
}

export default page;
//
