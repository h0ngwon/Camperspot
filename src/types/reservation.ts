export type ReservationInfo = {
  people: number;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  camp_area: {
    id: string;
    name: string;
    camp: {
      name: string;
    } | null;
  } | null;
}[];

export type CompanyReservationInfo = {
  id: string;
  client_name: string;
  client_phone: string;
  created_at: string;
  people: number;
  camp_area: {
    id: string;
    camp_area_name: string;
    camp: {
      camp_name: string;
      company_user: {
        id: string;
      } | null;
    } | null;
  } | null;
};
