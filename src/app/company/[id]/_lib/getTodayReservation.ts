import type { CompanyReservationInfo } from '@/types/reservation';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getTodayReservation = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [, , , companyId] = queryKey;
  const res = await fetch(`/api/company/${companyId}/reservation/today`, {
    method: 'GET',
  });
  const fetchData: CompanyReservationInfo[] = await res.json();
  return fetchData;
};
