'use client';
import { FcLike } from 'react-icons/fc';
// import styles from '../styles/Like.module.css'

import styles from '../_styles/CampList.module.css';
const Like = () => {
  return (
    <div className={styles.like}>
      <FcLike />
    </div>
  );
};

export default Like;
