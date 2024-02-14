import { deleteUserReview, getUserReview } from '@/app/profile/[id]/_lib/review';
import { ReviewType } from '@/types/review';
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export const useReviewQuery = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const userId = params.id as string;
  const { data: review, isLoading: isReviewLoading } = useQuery<ReviewType>({
    queryKey: ['mypage', 'profile', 'review', userId],
    queryFn: getUserReview,
  });

  const {mutate: reviewMutate, isPending: isReviewPending} = useMutation({
    mutationFn: deleteUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('리뷰가 삭제되었습니다!');
    },
  });

  return {review, reviewMutate, isReviewLoading, isReviewPending}
}