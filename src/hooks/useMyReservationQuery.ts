import {
  getUserReservation,
  deleteUserReservation,
} from '@/app/profile/[id]/_lib/reservation';
import type { UserReservationInfo } from '@/types/reservation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useMyReservationQuery = () => {
  const params = useParams();
  const userId = params.id;
  const {
    isLoading: isMyReservationLoading,
    error: myReservationError,
    data: reservations,
  } = useQuery<UserReservationInfo[]>({
    queryKey: ['mypage', 'reservation', userId],
    queryFn: getUserReservation,
  });
  const queryClient = useQueryClient();
  const { mutate: reservationMutate } = useMutation({
    mutationFn: deleteUserReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mypage', 'reservation', userId],
      });
    },
  });

  return {
    isMyReservationLoading,
    myReservationError,
    reservations,
    reservationMutate,
  };
};
