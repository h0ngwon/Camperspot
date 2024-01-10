'use client';

import { useState, ChangeEvent } from 'react';
type ReturnType = [string, (e: ChangeEvent<HTMLInputElement>) => void];
export default function useInput() {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // 배열인데, type이 안맞ㅇ므 얘가 string | (e: ChangeEvent<HTMLInputElement>) => void 이렇게 되어있음
  // [string,e: ChangeEvent<HTMLInputElement>) => void] 이렇게 명시를 해줘야됨
  return [value, handleChange] as ReturnType;
}
