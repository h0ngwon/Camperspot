export type Reservation = {
  people: number;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  camp_area: {
    name: string;
    campName: {
      name: string;
    } | null;
  } | null;
}[];
