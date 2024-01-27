'use client';
import React from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

interface Props {
  handleCompleteAddress: (data: Address) => void;
}

const AddressModal = ({ handleCompleteAddress }: Props) => {
  return (
    <div>
      <DaumPostcodeEmbed onComplete={handleCompleteAddress} />
    </div>
  );
};

export default AddressModal;
