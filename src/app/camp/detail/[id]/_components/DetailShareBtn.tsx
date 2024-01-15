'use client';

import { useParams } from 'next/navigation';

export default function DetailShareBtn() {
  const params = useParams() as { id: string };

  // 클립보드에 텍스트를 비동기적으로 복사하는 함수
  const copyToClipboard = async (text: string) => {
    try {
      // Clipboard API를 이용하여 텍스트를 클립보드에 복사
      await navigator.clipboard.writeText(text);
      // 복사 성공 시 알림 메시지 표시
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      // 복사 실패 시 에러 로그 출력
      console.error(error);
    }
  };

  // 버튼 클릭 시 동작하는 함수
  const handleCopyClick = () => {
    // 클립보드에 복사할 텍스트 생성
    const textToCopy = `${process.env.NEXT_PUBLIC_BASE_URL}/camp/detail/${params.id}`;
    // 클립보드에 텍스트 복사 함수 호출
    copyToClipboard(textToCopy);
  };

  return <button onClick={handleCopyClick}>URL 복사하기</button>;
}
