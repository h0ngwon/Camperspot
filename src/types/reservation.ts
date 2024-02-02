export type ReservationInfo = {
  id: string;
  max_people: number;
  price: number;
  name: string;
  camp: {
    name: string;
    check_in: string;
    check_out: string;
  } | null;
} | null;

export type CompanyReservationInfo = {
  id: string;
  client_name: string;
  client_phone: string;
  created_at: string;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  people: number;
  payment_method: string;
  camp_area: {
    id: string;
    name: string;
    camp: {
      name: string;
      check_in: string;
      check_out: string;
      company_user: {
        id: string;
      } | null;
    } | null;
  } | null;
};

export type CampAreaRservationInfo =
  | {
      check_in_date: string;
      check_out_date: string;
      camp_area_id: string;
    }[]
  | null;

export type UserReservationInfo = {
  id: string;
  created_at: string;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  people: number;
  client_name: string;
  client_phone: string;
  payment_method: string;
  camp_area: {
    name: string;
    photo_url: string;
    camp: {
      id: string;
      name: string;
      address: string;
      check_in: string;
      check_out: string;
    } | null;
  } | null;
};

// id: string;
// client_name: string;
// client_phone: string;
// created_at: string;
// check_in_date: string;
// check_out_date: string;
// fee:number;
// people: number;
// payment_method:string;
// camp_area: {
//   id: string;
//   camp_area_name: string;
//   camp: {
//     camp_name: string;
//     company_user: {
//       id: string;
//     } | null;
//   } | null;
// } | null;
// };

export type ReviewInfo = {
  campId: string;
  campName: string;
  campAreaName: string;
  check_in_date: string;
  check_out_date: string;
  photo_url: string;
};
