import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 100,
    },
  },
});
