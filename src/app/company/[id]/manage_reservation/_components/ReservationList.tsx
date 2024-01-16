import { supabase } from '@/app/api/db';
import Reservation from './Reservation';

const ReservationList = async ({ companyId }: { companyId: string }) => {
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(
      `id,client_name,client_phone,created_at,people,camp_area!inner(id,camp_area_name:name,camp!inner(camp_name:name,company_user!inner(id)))`,
    )
    .eq('camp_area.camp.company_user.id', companyId);

  const filterReservation = reservations?.filter(
    (reservation) =>
      new Date(reservation.created_at).toDateString() ===
      new Date().toDateString(),
  );
  console.log('예약정보', reservations);
  console.log('filtered', filterReservation);
  //    console.log('company1',reservationList![0].camp_area?.camp)
  //     console.log('company2',reservationList![1].camp_area?.camp)

  if (!reservations?.length) return <p>예약 현황이 없습니다.</p>;

  return (
    <>
      <h3>오늘의 예약 현황</h3>
      <ul>
        {filterReservation?.map((reservation) => (
          <Reservation key={reservation.id} reservation={reservation} />
        ))}
      </ul>
      <h3>전체 예약 현황</h3>
      <ul>
        {reservations?.map((reservation) => (
          <Reservation key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </>
  );
};

export default ReservationList;

{
  /* {reservationList?.map((reservation) => {
        const { id, created_at, client_name, client_phone, people } =
          reservation;
        const { camp_name } = reservation.camp_area?.camp!;
        const { camp_area_name } = reservation.camp_area!;
        return (
          <li className={styles.li} key={id}>
            <p>
              {new Date(created_at).toLocaleString('ko', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
            <p>{client_name}</p>
            <p>{camp_name}</p>
            <p>{camp_area_name} </p>
            <p>{people}</p>
            <p>{client_phone}</p>
          </li>
        );
      })} */
}
