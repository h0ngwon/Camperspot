import { getCompanyReservation } from '@/app/company/[id]/_lib/getCompanyUserReservation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type Props = { startDate: Date; endDate: Date };

export const useCompanyUserTotalReservationQuery = ({
  startDate,
  endDate,
}: Props) => {
  const params = useParams();
  const companyId = params.id as string;
  const { isLoading: isCompanyUserReservationLoading, data: reservations } =
    useQuery({
      queryKey: [
        'company',
        'reservation',
        companyId,
        startDate!.toISOString(),
        endDate!.toISOString(),
      ],
      queryFn: getCompanyReservation,
    });
  return { isCompanyUserReservationLoading, reservations };
};
