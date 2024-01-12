'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ControlProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

function Control({ hasNextPage, hasPrevPage }: ControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/camp/prac/?page=${Number(page) - 1}&per_page=${per_page}`,
          );
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/camp/prac/?page=${Number(page) + 1}&per_page=${per_page}`,
          );
        }}
      >
        next page
      </button>
    </div>
  );
}

export default Control;
