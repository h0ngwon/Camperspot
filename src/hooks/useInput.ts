'use client';

import { useState, ChangeEvent } from 'react';
type ReturnType = [
  string,
  (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
];
export default function useInput(data?: string) {
  const [value, setValue] = useState(data ?? '');
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };
  // 배열인데, type이 안맞음. 얘가 string | (e: ChangeEvent<HTMLInputElement>) => void 이렇게 되어있음
  // [string,e: ChangeEvent<HTMLInputElement>) => void] 이렇게 명시를 해줘야됨
  return [value, handleChange] as ReturnType;
}
