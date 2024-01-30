import { CompanyReservationInfo } from '@/types/reservation';

export const getCompanyReservation = async (companyId: string) => {
  const res = await fetch(`/api/company/${companyId}/reservation`, {
    method: 'GET',
  });
  const fetchData: CompanyReservationInfo[] = await res.json();
  console.log('fetch---', fetchData);
  return fetchData;
};
