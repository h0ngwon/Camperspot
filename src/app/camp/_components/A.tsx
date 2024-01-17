// 'use client';
// import Image from 'next/image';
// import React from 'react';
// import pic2 from '@/asset/abc.png';
// import styles from '../_styles/Photo.module.css';
// import SimpleSlider from './Sample';

// type Props = {
//   photos: { id: string; photo_url: string }[];
// };

// const Photo = ({ photos }: Props) => {
//   console.log(photos);
//   const onHandlePhotoBtn = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   ) => {
//     e.stopPropagation();
//     console.log('hi');
//   };
//   const url = pic2;
//   return (
//     <figure className={styles.picWrap}>
//       {/* <SimpleSlider /> */}
//       {photos?.map((photo) => {
//         return (
//           <Image
//             src={photo.photo_url}
//             alt='캠핑장 이미지'
//             fill
//             className={styles.pic}
//             key={photo.id}
//           />
//         );
//       })}
//       {/* <button
//         onClick={(e) => onHandlePhotoBtn(e)}
//         className={styles.photoButton}
//       >
//         {'<'}
//       </button>
//       <button className={styles.photoButton}>{'>'}</button> */}
//     </figure>
//   );
// };

// export default Photo;
