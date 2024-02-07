import { getUserPost } from '@/app/profile/[id]/_lib/profile';
import { MyPostType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useMyPostQuery = () => {
  const params = useParams();
  const userId = params.id as string;
  const { data: myPost, isLoading: isMyPostLoading } = useQuery<MyPostType>({
    queryKey: ['mypage', 'bookmark', 'post', userId],
    queryFn: getUserPost,
    refetchOnWindowFocus: true,
  });
  
  return {myPost, isMyPostLoading}
}