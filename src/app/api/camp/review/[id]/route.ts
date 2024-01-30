import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  return NextResponse.json(true);
};

export const POST = async () => {};
