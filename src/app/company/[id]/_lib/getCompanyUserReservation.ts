import { CompanyReservationInfo } from '@/types/reservation';

export const getCompanyReservation = async (
  companyId: string,
  startDate: string,
  endDate: string,
) => {
  //시작과 끝 날짜를 추가
  const res = await fetch(
    `/api/company/${companyId}/reservation?startDate=${startDate}&endDate=${endDate}`,
    {
      method: 'GET',
    },
  );
  const fetchData: CompanyReservationInfo[] = await res.json();
  return fetchData;
};
