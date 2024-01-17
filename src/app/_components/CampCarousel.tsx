'use client';
import styles from '../_styles/CampCarousel.module.css';
import { useState } from 'react';
import CampCard from './CampCard';
type Props = {
  camp:
    | {
        id: string;
        name: string;
        address: string;
        camp_area: { price: number }[];
        camp_pic: { id: string; photo_url: string }[];
      }[]
    | null;
};

const CampCarousel = ({ camp }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const nextSlide = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const prevSlide = () => {
    setCurrentIndex(currentIndex - 1);
  };
  // className={`${styles.carouselContainer} ${styles.aaa}`}
  // className={styles['carouselContainer,carousel']}

  return (
    <div
      className={styles.carouselBox}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={styles.carousel}>
        <ul
          className={styles.carouselContainer}
          style={{
            transform: `translateX(-${currentIndex * 300}px)`,
          }}
        >
          {camp!.map((item, index) => (
            <li key={index}>
              <div className={styles.carouselItem}>
                <CampCard camp={item} />
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={prevSlide}
          className={`${styles.btn} ${styles.left} 
          ${currentIndex === 0 ? styles.none : ''}
          ${isHover ? '' : styles.none}`}
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          className={`${styles.btn} ${styles.right} 
          ${currentIndex > 5 ? styles.none : ''}
          ${isHover ? '' : styles.none}`}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CampCarousel;
