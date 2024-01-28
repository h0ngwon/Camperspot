'use client';
import React from 'react';

import Script from 'next/script';
import AddForm from './_components/AddForm';
import styles from './_styles/CampForm.module.css';

const AddCampPage = () => {
  return (
    <>
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></Script>
      <h1 className={styles.h1}>캠핑장 등록</h1>
      <AddForm />
    </>
  );
};

export default AddCampPage;
