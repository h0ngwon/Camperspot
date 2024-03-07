import { deleteCompanyReservation } from '@/app/company/[id]/manage_reservation/_lib/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useDeleteCompanyUserReservationQuery = (reservationId: string) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const companyId = params.id as string;
  const { mutate: reservationMutate } = useMutation({
    mutationFn: () => deleteCompanyReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company', 'reservation', companyId],
      });
    },
  });
  return { reservationMutate };
};
