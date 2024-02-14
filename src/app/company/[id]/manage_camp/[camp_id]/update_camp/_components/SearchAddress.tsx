import React from 'react';
import { Address } from 'react-daum-postcode';
import styles from '../_styles/CampForm.module.css';
import AddressModal from './AddressModal';

type Props = {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  isAddressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchAddress = ({
  setAddress,
  isAddressModal,
  setAddressModal,
}: Props) => {
  // 주소 검색 로직
  const handleCompleteAddress = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setAddressModal(false);
    document.body.style.overflow = 'unset';
  };
  const handleClickOutsideModal = () => {
    setAddressModal(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {isAddressModal && (
        <div className={styles.modalUP} onClick={handleClickOutsideModal}>
          <AddressModal handleCompleteAddress={handleCompleteAddress} />
        </div>
      )}
    </>
  );
};

export default SearchAddress;
