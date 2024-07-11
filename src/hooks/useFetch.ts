import { useState, useEffect, useCallback, useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export default function useFetch<T, P>(
  apiCall: (params?: P) => Promise<T>,
  apiParams?: P,
  options?: AxiosRequestConfig,
): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  const memoizedApiCall = useCallback(apiCall, [apiCall]);
  const memoizedParams = useMemo(() => JSON.stringify(apiParams), [apiParams]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const data = await memoizedApiCall(apiParams);
        setFetchState({ isLoading: false, isError: false, data });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchData();
  }, [memoizedApiCall, memoizedParams]);

  return fetchState;
}
