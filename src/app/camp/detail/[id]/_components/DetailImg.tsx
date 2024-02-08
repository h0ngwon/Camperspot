import Image from 'next/image';

import styles from '../_styles/DetailImg.module.css';

type Props = {
  campPic: { photo_url: string }[] | undefined;
};

export default function DetailImg({ campPic }: Props) {
  return (
    <div className={styles.imgWrap}>
      {campPic?.map((photo, index) => {
        return (
          <div key={index}>
            <Image
              src={photo?.photo_url}
              alt=''
              fill
              priority
              sizes='(min-width: 900px) 450px, 100vw'
            />
          </div>
        );
      })}
    </div>
  );
}
