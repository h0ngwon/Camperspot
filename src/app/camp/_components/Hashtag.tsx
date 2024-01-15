'use client';
import axios from 'axios';

type Props = {
  tags: { tag: string | null }[];
};
const Hashtag = ({ tags }: Props) => {
  const onHandleFilterBtn = async () => {
    //여기서 보내는 요청이 어떻게 해야지 page에 영향을 줄까?
    //비동기요청이아닌 주소바꾸기
    await axios.get('');
  };

  return (
    <>
      {tags.map((tag, i) => {
        return (
          <li key={i} onClick={onHandleFilterBtn}>
            #{tag.tag}
          </li>
        );
      })}
    </>
  );
};
export default Hashtag;
