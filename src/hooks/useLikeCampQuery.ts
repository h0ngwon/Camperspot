import { getUserLikeCamp } from '@/app/profile/[id]/_lib/profile';
import { LikeCampType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useLikeCampQuery = () => {
  const params = useParams();
  const userIdTest = params.id as string;

  const { data: likeCampData, isLoading: isLikeCampLoading } =
    useQuery<LikeCampType>({
      queryKey: ['mypage', 'bookmark', 'camp', userIdTest],
      queryFn: getUserLikeCamp,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    });

  return { likeCampData, isLikeCampLoading };
};
