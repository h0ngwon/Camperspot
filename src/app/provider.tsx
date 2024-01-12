import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
