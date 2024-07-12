import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { ERROR_MESSAGES } from '@/\bconstants/errorMessages';

interface UseFetchDataProps<T> {
  fetchData: () => Promise<T>;
}

interface UseFetchDataResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export const useFetchData = <T>({ fetchData }: UseFetchDataProps<T>): UseFetchDataResult<T> => {
  const [data, setData] = useState<T>(() => [] as unknown as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataCallback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchData();
      setData(res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status || 'default';
        setError(ERROR_MESSAGES[status] || ERROR_MESSAGES.default);
      } else {
        setError(ERROR_MESSAGES.network);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  return { data, loading, error };
};
