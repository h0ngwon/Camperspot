'use client';
import Spacer from '@/components/Spacer';
import styles from '../../_styles/Camp.module.css';
import { useEffect, useState } from 'react';
import { ParamsCamp, SearchCamp, TCamp } from '@/types/campList';
import CampFilter from '../../_components/CampFilter';
import FacilityFilter from '../../_components/FacilityFilter';
import CampList from '../../_components/CampList';

type Props = {
  camp: SearchCamp;
  error: any;
};

const SearchView = ({ camp, error }: Props) => {
  const [campData, setCampData] = useState<SearchCamp>(camp);
  const [filteredCampData, setFilteredCampData] = useState<SearchCamp>(camp);
  const [errorData, setErrorData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalData = filteredCampData?.length;

  useEffect(() => {
    setCampData(camp);
    setFilteredCampData(camp);
  }, [camp]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampData?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalData! / itemsPerPage);

  const pageTitle = `검색 결과 (${totalData}건)`;
  return (
    <>
      <div className={styles.container}>
        <Spacer y={50} />
        <div className={styles.mainWrapper}>
          <h1 className={styles.title}>{pageTitle}</h1>

          <div className={styles.mainHeader}>
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
          {/* <TestController
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

export default SearchView;
