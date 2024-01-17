import Link from 'next/link';

const RegionFiltter = () => {
  const regions = [
    '서울',
    '경기도',
    '강원도',
    '충청도',
    '전라도',
    '경상도',
    '제주도',
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
