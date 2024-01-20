'use client';
import React from 'react';
import styles from '../_styles/Content.module.css';

type Props = {
  children: React.ReactNode;
};

const Content = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Content;
