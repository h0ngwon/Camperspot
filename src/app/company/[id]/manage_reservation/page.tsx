import ReservationList from './_components/ReservationList';

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ReservationList companyId={params.id} />
    </>
  );
};

export default page;
