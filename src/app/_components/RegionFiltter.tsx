import Link from 'next/link';

const RegionFiltter = () => {
  const regions = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '대전',
    '전북',
    '전남',
    '광주',
    '경북',
    '울산',
    '경남',
    '부산',
    '제주',
  ];
  return (
    <div>
      {regions.map((region) => {
        return (
          <Link href={`/camp/search?region=${region}`} key={region}>
            {region}
          </Link>
        );
      })}
    </div>
  );
};

export default RegionFiltter;
