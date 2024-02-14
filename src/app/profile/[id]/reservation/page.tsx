import BookmarkCamp from '../_components/BookmarkCamp';
import { ReservationDetail } from '../_components/ReservationDetail';
import UserReview from '../_components/UserReview';

const MypageReservation = () => {
  return (
    <>
      <ReservationDetail />
      <BookmarkCamp />
      <UserReview />
    </>
  );
};

export default MypageReservation;
