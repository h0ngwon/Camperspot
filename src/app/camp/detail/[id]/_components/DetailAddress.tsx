import LocationSvg from '../_svg/LocationSvg';

import styles from '../_styles/DetailAddress.module.css';

type Props = {
  address: string | undefined;
};

export default function DetailAddress({ address }: Props) {
  const addressCopy = () => {
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          alert('복사되었습니다.');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className={styles.addressWrap}>
        <div className={styles.address}>
          <LocationSvg />
          <div>{address}</div>
        </div>
        <button onClick={addressCopy}>복사하기</button>
      </div>
    </>
  );
}
