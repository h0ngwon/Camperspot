'use client';
import Spacer from '@/components/Spacer';
import styles from '../_styles/Camp.module.css';
import CampFilter from '../_components/CampFilter';
import CampList from '../_components/CampList';
import FacilityFilter from '../_components/FacilityFilter';
import { useEffect, useState } from 'react';
import { CampLists, TCamp } from '@/types/campList';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = ({ searchParams }: Props) => {
  const { region, keyword, check_in, check_out, people, sort } = searchParams;

  const [campData, setCampData] = useState<TCamp[]>();
  const [count, setCount] = useState(0);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('http://localhost:3000/api/camp/search');
      if (region) url.searchParams.append('region', region as string);
      if (keyword) url.searchParams.append('keyword', keyword as string);
      if (check_in) url.searchParams.append('check_in', check_in as string);
      if (check_out) url.searchParams.append('check_out', check_out as string);
      if (people) url.searchParams.append('people', people as string);
      if (sort) url.searchParams.append('sort', sort as string);

      const response = await fetch(url.toString());
      const { camp, count, error } = await response.json();
      setCampData(camp);
      setCount(count);
      setErrorData(error);
    };

    fetchData();
  }, [region, keyword, check_in, check_out, people, sort]);
  // camp=>camp_area=>reservation
  // reservation - check_in_date~check_out_date 와 비교해서
  // check_in ~ check_out 기간이 check_in_date ~ check_out 기간과 겹치지 않는 데이터만 가져오기
  // Mutually exclusive to a range 활용하려면 배열로 바꿔야함
  // */

  //   const { data: camp, error, count } = await query;
  // console.log('camp', camp);
  // console.log(count);
  // // console.log('camp', camp?.[0].camp_facility[0].facility);
  // console.log('error', error);
  //에러 핸들링은 어떻게?
  const pageTitle = `검색 결과 (${count}건)`;
  console.log(campData);
  return (
    <>
      <div className={styles.container}>
        <Spacer y={50} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <CampFilter />
          </div>
          <FacilityFilter campData={campData} setCampData={setCampData} />
          <div className={styles.listWrapper}>
            <div className={styles.camplList}>
              <CampList campList={campData!} />
            </div>
          </div>
          <Spacer y={50} />

          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
