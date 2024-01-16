'use client';
import React from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import styles from '../_styles/SearchAddress.module.css';

interface Props {
  handleCompleteAddress: (data: Address) => void;
}

const AddressModal = ({ handleCompleteAddress }: Props) => {
  return (
    <div className={styles.modalSize}>
      <DaumPostcodeEmbed onComplete={handleCompleteAddress} />
    </div>
  );
};

export default AddressModal;
