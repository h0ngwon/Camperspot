import { modifyUserData } from '@/app/profile/[id]/_lib/profile';
import { getUserData } from '@/app/profile/[id]/_lib/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useProfileQuery = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = params.id;

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['mypage', 'profile', userId],
    queryFn: getUserData,
  });
  const {mutate: profileMutate, isPending: isProfilePending} = useMutation({
    mutationFn: modifyUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'profile', userId],
      });
    },
  });

  return {profile, profileMutate ,isProfileLoading, isProfilePending}
}