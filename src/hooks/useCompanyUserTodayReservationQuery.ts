import { getTodayReservation } from '@/app/company/[id]/_lib/getTodayReservation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useCompanyUserTodayReservationQuery = () => {
  const params = useParams();
  const companyId = params.id;
  const { isLoading: isCompanyUserReservationLoading, data: reservations } =
    useQuery({
      queryKey: ['company', 'reservation', 'today', companyId],
      queryFn: getTodayReservation,
    });

  return { isCompanyUserReservationLoading, reservations };
};
