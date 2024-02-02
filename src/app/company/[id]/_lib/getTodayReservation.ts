import type { CompanyReservationInfo } from '@/types/reservation';

export const getTodayReservation = async (companyId: string) => {
  const res = await fetch(`/api/company/${companyId}/reservation/today`, {
    method: 'GET',
  });
  const fetchData: CompanyReservationInfo[] = await res.json();
  return fetchData;
};
