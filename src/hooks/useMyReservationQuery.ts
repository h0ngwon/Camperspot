import { deleteUserReservation } from '@/app/profile/[id]/_lib/deleteUserReservation';
import { getUserReservation } from '@/app/profile/[id]/_lib/getUserReservation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useMyReservationQuery = (reservationId?: string) => {
  const params = useParams();
  const userId = params.id;
  const {
    isLoading: isMyReservationLoading,
    error: myReservationError,
    data: reservations,
  } = useQuery({
    queryKey: ['mypage', 'reservation', userId],
    queryFn: getUserReservation,
  });

  const queryClient = useQueryClient();
  const { mutate: reservationsMutate } = useMutation({
    mutationFn: () => deleteUserReservation(reservationId as string),
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
    reservationsMutate,
  };
};
