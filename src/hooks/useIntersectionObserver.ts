import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  threshold?: number;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  // 관찰 요소
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        // 타겟이 화면에 관찰되고, 다음 페이지가 존재할 때 다음 페이지 호출
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!target) return;

    //Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, { threshold });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
