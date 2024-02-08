'use client';
import Modal from '@/components/Modal';
import ModalPortal from '@/components/ModalPortal';
import useModalStore from '@/store/modal';
import ReservationModal from '../_components/ReservationModal';
import DetailPage from '../page';

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
