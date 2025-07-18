import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import { queryClientConfig } from '@/constants/transtackConfig.ts';

import '@/styles/index.scss';

const queryClient = new QueryClient(queryClientConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
