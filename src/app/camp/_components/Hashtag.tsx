'use client';
import axios from 'axios';

type Props = {
  tags: { tag: string | null }[];
};
const Hashtag = ({ tags }: Props) => {
  console.log(tags);
  const onHandleFilterBtn = async () => {
    console.log('hi');
    //여기서 보내는 요청이 어떻게 해야지 page에 영향을 줄까?
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
