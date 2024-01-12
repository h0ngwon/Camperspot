'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

function PageController({ hasNextPage, hasPrevPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';

  return (
    <div>
      <button
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/camp/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev page
      </button>

      <div>{page}</div>

      <button
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/camp/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
      </button>
    </div>
  );
}

export default PageController;
