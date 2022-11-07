import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react';

// Create a client
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
}

export const RQProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)
