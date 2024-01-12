'use client';
import { FcLike } from 'react-icons/fc';

import styles from './campList.module.css';
const Like = () => {
  return (
    <div className={styles.like}>
      <FcLike />
    </div>
  );
};

export default Like;
