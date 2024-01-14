import React from 'react';
import styles from './_components/campAreaForm.module.css';
type Props = {};

const addCampAreaPage = (props: Props) => {
  return (
    <>
      <h1>캠핑존 설정</h1>
      <form className={styles.formLayout}>
        <div>
          <h3>캠핑존 이름</h3>
          <input placeholder='이름을 입력해주세요' />
        </div>
        <div>
          <h3>최대 수용인원</h3>
          <input type='number' />
        </div>
        <div>
          <h3>금액</h3>
          <input />
          <span>원</span>
        </div>
        <div>
          <h3>캠핑존 사진 등록</h3>
          <input
            type='file'
            // ref={imgRef}
          />
          {/* {campPicture?.filter((item) => {
            if (item.camp_id === campId) {
              return <img src={item.photo_url} />;
            }
          })} */}
        </div>
      </form>
    </>
  );
};

export default addCampAreaPage;
