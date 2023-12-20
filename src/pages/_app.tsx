import '@/styles/globals.css';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { LetterContextProvider } from '../hooks/useLetterContext';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <LetterContextProvider>
            <Component {...pageProps} />
          </LetterContextProvider>
        </Layout>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
