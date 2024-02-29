import { getUserPost } from '@/app/profile/[id]/_lib/profile';
import { MyPostType } from '@/types/profile';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useMyPostQuery = () => {
  const params = useParams();
  const userId = params.id as string;
  const {
    data: myPost,
    isLoading: isMyPostLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MyPostType>({
    queryKey: ['mypage', 'bookmark', 'post', userId],
    queryFn: ({ pageParam = 1 }) => getUserPost(userId, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length : undefined,
    initialPageParam: 0,
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { myPost, isMyPostLoading, setTarget };
};
