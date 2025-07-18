import { type QueryClientConfig } from '@tanstack/react-query';

import { THREE_HOURS } from '@/constants/TimeUnits';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: false, // Default is caching fetched values
      refetchOnWindowFocus: false,
      staleTime: THREE_HOURS,
      gcTime: THREE_HOURS,
      // Do not retry on errors defined above
      retry: (_, error) => {
        if (error) {
          return false;
        }
        return false;
      },
    },
  },
};
