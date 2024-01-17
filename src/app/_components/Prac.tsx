'use client';
import React, { useState } from 'react';
import styles from './a.module.css';
import Spacer from '@/components/Spacer';
const Prac = () => {
  const items = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 1, 2, 3, 4, 5];
  const [current, setCurrent] = useState(0);
  const length = items.length;
  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  console.log(current);

  if (!Array.isArray(items) || items.length <= 0) {
    return null;
  }
  return (
    <>
      <Spacer y={50} />

      <div className={styles.slider}>
        <div className={styles.aleft} onClick={prev}>
          {'<'}
        </div>
        <div className={styles.aright} onClick={next}>
          {'>'}
        </div>
        {/* `${a === 'blue' ? styles.blue : styles.red}` */}

        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={`${index === current ? 'slideActive' : 'slide'}`}
            >
              {(index === current ||
                index === current + 1 ||
                index === current + 2 ||
                index === current + 3) && (
                <div key={item} className={styles.pho}>
                  {item}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Spacer y={500} />
    </>
  );
};

export default Prac;
// import React from 'react';
// import styles from './a.module.css';
// import Spacer from '@/components/Spacer';
// const Prac = () => {
//   return (
//     <>
//       <div className={styles.warp}>
//         <div className={styles.inner}>
//           <div>사진1</div>
//         </div>
//         <div className={styles.inner}>
//           <div>사진2</div>
//         </div>
//         <div className={styles.inner}>
//           <div>사진3</div>
//         </div>
//       </div>
//       <Spacer y={500} />
//     </>
//   );
// };

// export default Prac;

// 'use client';
// import React, { useState } from 'react';
// import styles from './a.module.css';
// import Spacer from '@/components/Spacer';

// const Prac = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const items = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ'];
//   const itemsToShow = 4;
//   //   const nextSlide = () => {
//   //     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   //   };
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % items.length);
//   };
//   //   const prevSlide = () => {
//   //     setCurrentIndex((prevIndex) =>
//   //       prevIndex === 0 ? items.length - 1 : prevIndex - 1,
//   //     );
//   //   };
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? items.length - itemsToShow : prevIndex - itemsToShow,
//     );
//   };

//   return (
//     <div>
//       <div className={styles.carousel}>
//         <div
//           className={styles.carouselContainer}
//           style={{
//             transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
//           }}
//         >
//           {items.map((item, index) => (
//             <div key={index} className={styles.carouselItem}>
//               {/* Render your content or image here */}
//               <div>{item}</div>
//             </div>
//           ))}
//         </div>
//         <button onClick={prevSlide}>Previous</button>
//         <button onClick={nextSlide}>Next</button>
//       </div>
//       <Spacer y={500} />
//     </div>
//   );
// };

// export default Prac;

// <div className={styles.carousel}>
//   <div
//     className={styles.carouselContainer}
//     style={{ transform: `translateX(-${currentIndex * 25}%)` }}
//   >
//     {items.map((item, index) => (
//       <div key={index} className={styles.carouselItem}>
//         {/* Render your content or image here */}
//         <div>{item}</div>
//       </div>
//     ))}
//   </div>
//   <button onClick={prevSlide}>Previous</button>
//   <button onClick={nextSlide}>Next</button>
// </div>;

// 'use client';
// import styles from './a.module.css';
// type Props = {
//   camp:
//     | {
//         id: string;
//         name: string;
//         address: string;
//         camp_area: { price: number }[];
//         camp_pic: { id: string; photo_url: string }[];
//       }[]
//     | null;
// };

// const CarouselPrac = ({ camp }: Props) => {
//   return (
//     <>
//       {/* <div className={styles.box}> */}
//       <span className={styles.left}>{'<'}</span>
//       <div className={styles.container}>
//         <div className={styles.slide}>1</div>
//         <div className={styles.slide}>2</div>
//         <div className={styles.slide}>3</div>
//       </div>
//       <span className={styles.right}>{'>'}</span>
//       <span className={styles.indivators}>
//         {camp?.map((_, idx) => {
//           return (
//             <button
//               key={idx}
//               onClick={undefined}
//               className={styles.indicator}
//             ></button>
//           );
//         })}
//       </span>
//       {/* </div> */}
//     </>
//   );
// };

// export default CarouselPrac;
