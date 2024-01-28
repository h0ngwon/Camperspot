'use client';
import useModalStore from '@/store/modal';
import ReservationModal from '../_components/ReservationModal';
import DetailPage from '../page';
import ModalPortal from '@/components/ModalPortal';
import Modal from '@/components/Modal';

const ReservationPage = () => {
  const { show } = useModalStore();
  return (
    <>
      <DetailPage />
      {show && (
        <ModalPortal>
          <Modal customWidth={860} customHeight={490}>
            <ReservationModal />
          </Modal>
        </ModalPortal>
      )}
    </>
  );
};

export default ReservationPage;
