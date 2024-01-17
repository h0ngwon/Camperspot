'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from '../_styles/Carousel.module.css';
const Carousel = () => {
  const banner = useMemo(() => {
    return ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  }, []);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const onHandleCarousel = () => {
    carouselRef.current!.style.transform = `translateX(${
      currentIndex * -1920
    }px)`;
    if (banner.length === currentIndex + 1) {
      return setCurrentIndex(0);
    }
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    carouselRef.current!.style.width = `${banner.length * 1920}px`;
  }, [banner]);

  useEffect(() => {
    setTimeout(() => {
      onHandleCarousel();
    }, 3000);
  }, [onHandleCarousel]);
  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.carousel} ${styles.carouselWidth}`}
          ref={carouselRef}
        >
          {banner.map((item, idx) => (
            <div className={styles.inner} key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <button onClick={onHandleCarousel}>
        일ㄴ어링너랴ㅐㄴ어래ㅑㄴ얼ㄴ야ㅐ
      </button>
    </>
  );
};

export default Carousel;
/**
 * 사이즈는 100vh
 */
