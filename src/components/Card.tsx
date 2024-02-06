import React from 'react';
import styles from '../styles/Card.module.css'

type Props = {
  children: React.ReactNode;
  large?: string
};

const Card = ({ children, large }: Props) => {
  return <div className={large === 'large' ? styles.large : styles.card}>{children}</div>;
};

export default Card;
