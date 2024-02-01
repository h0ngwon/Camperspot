'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

// TODO: SessionProvider도 한 번에 두고 Providers라고 해버렸다면?
export default function Provider({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
