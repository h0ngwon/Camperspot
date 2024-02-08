'use client';
import Spacer from '@/components/Spacer';
import type { SearchCamp } from '@/types/campList';
import { useEffect, useState } from 'react';
import CampList from '../../_components/CampList';
import FacilityFilter from '../../_components/FacilityFilter';
import styles from '../../_styles/Camp.module.css';
import SearchPageController from './SearchPageController';
import SearchReasultSvg from './SearchReasultSvg';

type Props = {
  camp: SearchCamp;
  error: any;
};

const SearchView = ({ camp, error }: Props) => {
  const [campData, setCampData] = useState<SearchCamp>(camp);
  const [filteredCampData, setFilteredCampData] = useState<SearchCamp>(camp);
  const [errorData, setErrorData] = useState(null);
  const [paginatedCamp, setPaginatedCamp] = useState<SearchCamp>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalData = filteredCampData?.length;

  //data를 set
  useEffect(() => {
    setCampData(camp);
    setFilteredCampData(camp);
  }, [camp]);
  //error 핸들링
  useEffect(() => {
    setErrorData(error);
  }, [error]);
  //currentPage를 받아서 pagination
  function paginateCamp(filteredCampData: SearchCamp, page: number) {
    const pageStart = (page - 1) * 9;
    const pageEnd = pageStart + 9;
    const paginate = filteredCampData.slice(pageStart, pageEnd);
    setPaginatedCamp(paginate);
  }
  useEffect(() => {
    paginateCamp(filteredCampData, currentPage);
  }, [filteredCampData, currentPage]);

  const pageTitle = `검색 결과 (${totalData}건)`;

  return (
    <>
      <div className={styles.container}>
        <Spacer y={50} />
        <div className={styles.mainWrapper}>
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <FacilityFilter
              campData={campData}
              setFilteredCampData={setFilteredCampData}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <Spacer y={30} />
          {totalData ? (
            <>
              <div className={styles.listWrapper}>
                <div className={styles.camplList}>
                  <CampList campList={paginatedCamp!} />
                </div>
              </div>
              <Spacer y={50} />

              <SearchPageController
                totalData={totalData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <>
              <Spacer y={100} />
              <SearchReasultSvg />

              <p className={styles.noCamp}>검색 결과가 없습니다.</p>
            </>
          )}
          <Spacer y={50} />
        </div>
      </div>
    </>
  );
};

export default SearchView;
