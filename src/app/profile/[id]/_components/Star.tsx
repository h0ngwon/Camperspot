import React from 'react';
import styles from '../_styles/Star.module.css';

type StarProps = {
  active: string;
};

const Star: React.FC<StarProps> = ({ active }) => {
  return (
    <span className={active === 'active' ? styles.active : styles['in-active']}>
      ⭐️
    </span>
  );
};

export default React.memo(Star);
