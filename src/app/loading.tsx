import Image from 'next/image';
import React from 'react';
import loader from '../asset/loader.gif';
import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
      <Image src={loader} width={0} height={0} alt='loader' className={styles.image} priority={true}/>
    </div>
  );
};

export default Loading;
