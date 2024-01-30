import React from 'react';
import styles from '../_styles/CampForm.module.css';
import removeBtn from '@/asset/ico_small_remove_btn.png';
import Image from 'next/image';
import { toast } from 'react-toastify';

type Props = {
  hashTags: string[];
  setHashTags: React.Dispatch<React.SetStateAction<string[]>>;
  inputHashTag: string;
  setInputHashTag: React.Dispatch<React.SetStateAction<string>>;
};

const Hashtag = ({
  hashTags,
  setHashTags,
  inputHashTag,
  setInputHashTag,
}: Props) => {
  // 해시태그
  const isEmptyValue = (value: string | any[]) => {
    if (!value.length) {
      return true;
    }
    return false;
  };

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (isEmptyValue(e.currentTarget.value.trim())) {
      return setInputHashTag('');
    }

    let newHashTag = e.currentTarget.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag)) return;

    if (hashTags.length >= 10) {
      toast.error('해시태그는 10개 이하로 작성해주세요!');
      return;
    }

    setHashTags((prevHashTags) => {
      // return [...new Set([...prevHashTags, newHashTag])];
      const uniqueHashTags = new Set([...prevHashTags, newHashTag]);
      return Array.from(uniqueHashTags);
    });

    setInputHashTag('');
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) {
      setInputHashTag('');
    }
  };

  const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTag(e.target.value);
  };

  const handleDeleteHashtag = (hashTag: string) => {
    setHashTags(
      hashTags.filter((item) => {
        return item !== hashTag;
      }),
    );
  };

  return (
    <div>
      <h3 className={styles.h3}>해시태그 추가</h3>
      <div className={styles.hashtagsDisplayFlex}>
        {hashTags.length > 0 &&
          hashTags.map((item) => {
            return (
              <div key={item} className={styles.hashtag}>
                <div className='tag'>{'#' + item}</div>
                <button
                  type='button'
                  onClick={() => handleDeleteHashtag(item)}
                  className={styles.removeHashtagBtn}
                >
                  <Image
                    src={removeBtn}
                    alt='해시태그 삭제 버튼'
                    width={8}
                    height={8}
                  />
                </button>
              </div>
            );
          })}
      </div>
      <input
        value={inputHashTag}
        onChange={(e) => changeHashTagInput(e)}
        onKeyUp={(e) => addHashTag(e)}
        onKeyDown={(e) => keyDownHandler(e)}
        placeholder='#해시태그를 등록해보세요. (최대 10개)'
        className={styles.hashTagInput}
      />
      {/* <input
                placeholder='해시태그를 추가해주세요'
                defaultValue={hashtag}
                onChange={setHashtag}
              /> */}
    </div>
  );
};

export default Hashtag;
