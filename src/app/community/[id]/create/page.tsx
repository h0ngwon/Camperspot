'use client';

import React, { useState } from 'react';
import { supabase } from '@/app/api/db';
import { uuid } from 'uuidv4';

export default function Page() {
  const [content, setContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postId = uuid();

    const { data: post, error } = await supabase
      .from('post')
      .insert([
        {
          id: postId,
          content,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      alert(error.message);
    } else {
      alert('등록되었습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='내용을 입력하세요.'
          required
        />
      </label>
      <br />
      <button type='submit'>등록</button>
    </form>
  );
}
