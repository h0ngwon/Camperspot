import { supabase } from "@/app/api/db"
import styles from '../_styles/ReservationList.module.css';

const ReservationList = async ({companyId}:{companyId:string}) => {
    const {data:reservationList,error} = await supabase.from('reservation')
    .select(
        `id,client_name,client_phone,created_at,people,camp_area!inner(id,camp_area_name:name,camp!inner(camp_name:name,company_user!inner(id)))`
    )
  
   .eq('camp_area.camp.company_user.id',companyId); 
    console.log('예약정보',reservationList);
//    console.log('company1',reservationList![0].camp_area?.camp)
//     console.log('company2',reservationList![1].camp_area?.camp)

   if(!reservationList?.length) return <p>예약 현황이 없습니다.</p>;

  return (
   <>
   {reservationList?.map((reservation)=> {
    const {id,created_at,client_name,client_phone,people}  = reservation;
    const {camp_name} = reservation.camp_area?.camp!;
    const {camp_area_name} = reservation.camp_area!;
    return (
    <li className={styles.li} key={id}> 
         <p>{new Date(created_at).toLocaleString('ko',{
            year:'numeric',
            month:'2-digit',
            day:'2-digit'
         })}</p>
        <p>{client_name}</p>
        <p>{camp_name}</p>
        <p>{camp_area_name} </p> 
        <p>{people}</p>
         <p>{client_phone}</p>
    </li>
    );
   })}
   </>
 );
}

export default ReservationList