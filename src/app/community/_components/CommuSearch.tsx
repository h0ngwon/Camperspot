import { useState } from 'react';

export default function CommuSearch() {
  const [commuInput, setCommuInput] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventdefault();

    alert('hi');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        value={commuInput}
        onChange={(e) => setCommuInput(e.target.value)}
      />
      <button type='submit'>검색</button>
    </form>
  );
}
