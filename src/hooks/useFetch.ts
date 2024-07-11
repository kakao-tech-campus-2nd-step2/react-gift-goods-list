import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export default function useFetch<T>(apiCall: () => Promise<T>, options?: AxiosRequestConfig): FetchState<T> {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const data = await apiCall();
        setFetchState({ isLoading: false, isError: false, data });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchData();
  }, [apiCall]);

  return fetchState;
}
