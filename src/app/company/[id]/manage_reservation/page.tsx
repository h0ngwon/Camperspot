import ReservationList from './_components/ReservationList'

const page = ({params}:{params:{id:string}}) => {
  return (
    <>
        <h3>오늘의 예약 현황</h3>

        <h3>전체 예약 현황</h3>
        <ul>
            <p>예약 일시</p>
            <p>예약자명</p>
            <p>캠핑존</p>
            <p>인원</p>
            <p>예약자 연락처</p>
            <ReservationList companyId={params.id}/>
        </ul>
    </>
  )
}

export default page