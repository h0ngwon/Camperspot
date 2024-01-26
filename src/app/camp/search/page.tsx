'use client';
import Spacer from '@/components/Spacer';
import styles from '../_styles/Camp.module.css';
import CampFilter from '../_components/CampFilter';
import CampList from '../_components/CampList';
import FacilityFilter from '../_components/FacilityFilter';
import { useEffect, useState } from 'react';
import { CampLists, TCamp } from '@/types/campList';
import PageController from '../_components/PageController';
import SearchPageController from './_components/SearchPageController';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchPage = ({ searchParams }: Props) => {
  const { region, keyword, check_in, check_out, people, sort } = searchParams;

  const [campData, setCampData] = useState<TCamp[]>();
  const [filteredCampData, setFilteredCampData] = useState<TCamp[]>();
  const [errorData, setErrorData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalData = filteredCampData?.length;
  useEffect(() => {
    const fetchData = async () => {
      const url = new URL('http://localhost:3000/api/camp/search');
      if (region) url.searchParams.append('region', region as string);
      if (keyword) url.searchParams.append('keyword', keyword as string);
      if (check_in) url.searchParams.append('check_in', check_in as string);
      if (check_out) url.searchParams.append('check_out', check_out as string);
      if (people) url.searchParams.append('people', people as string);
      if (sort) url.searchParams.append('sort', sort as string);
      console.log(url);
      const response = await fetch(url.toString());
      const { camp, error } = await response.json();
      setCampData(camp);
      setFilteredCampData(camp);
      setErrorData(error);
    };

    fetchData();
  }, [region, keyword, check_in, check_out, people, sort]);
  // camp=>camp_area=>reservation
  // reservation - check_in_date~check_out_date 와 비교해서
  // check_in ~ check_out 기간이 check_in_date ~ check_out 기간과 겹치지 않는 데이터만 가져오기
  // Mutually exclusive to a range 활용하려면 배열로 바꿔야함
  // */
  if (errorData) {
    return <div>Data fetching Error</div>;
  }
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampData?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(totalData! / itemsPerPage);

  const pageTitle = `검색 결과 (${totalData}건)`;
  return (
    <>
      <div className={styles.container}>
        <Spacer y={50} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <CampFilter />
          </div>
          <FacilityFilter
            campData={campData}
            setFilteredCampData={setFilteredCampData}
          />
          <div className={styles.listWrapper}>
            <div className={styles.camplList}>
              <CampList campList={filteredCampData!} />
            </div>
          </div>
          <Spacer y={50} />
          {/* <SearchPageController
            itemsPerPage={itemsPerPage}
            totalItems={totalData || 0}
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
          /> */}
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
