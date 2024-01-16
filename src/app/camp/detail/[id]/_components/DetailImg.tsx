import Image from 'next/image';
import React from 'react';

type Props = {
  campPic: { photo_url: string }[] | undefined;
};

export default function DetailImg({ campPic }: Props) {
  return (
    <>
      {campPic?.map((photo, index) => {
        return (
          <div key={index}>
            <Image src={photo?.photo_url} alt='' width={100} height={100} />
          </div>
        );
      })}
    </>
  );
}
