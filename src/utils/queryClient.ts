import axios from 'axios';
import { QueryCache, QueryClient } from 'react-query';

import { getErrorMessage } from '@/utils/errorHandler';

const queryCache = new QueryCache({
  onError: (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
});
