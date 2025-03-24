'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Instanciar o QueryClient apenas no cliente
export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

  useEffect(() => {
    setQueryClient(new QueryClient()); // A criação só ocorre no lado do cliente
  }, []);

  if (!queryClient) {
    return <div>Loading...</div>; // Exibe um carregando enquanto o QueryClient está sendo configurado
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
