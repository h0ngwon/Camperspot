import { CompanyReservationInfo } from '@/types/reservation';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getCompanyReservation = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [, , companyId, startDate, endDate] = queryKey;
  const res = await fetch(
    `/api/company/${companyId}/reservation?startDate=${startDate}&endDate=${endDate}`,
    {
      method: 'GET',
    },
  );
  const fetchData: CompanyReservationInfo[] = await res.json();
  return fetchData;
};
