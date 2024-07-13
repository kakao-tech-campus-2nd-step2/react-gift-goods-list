import { useEffect, useState } from 'react';

import { axiosInstance } from '@/api';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

const useFetch = <T>(url: string, params: object) => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const response = await axiosInstance.get(url, { params });
        setFetchState({ isLoading: false, isError: false, data: response.data });
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchData();
  }, [url, params]);

  return fetchState;
};

export default useFetch;
