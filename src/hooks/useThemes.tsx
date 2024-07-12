import { useEffect,useState } from 'react';

import apiClient from '@/api/index';
import type { GetThemesResponse, ThemeData } from '@/api/types/apiTypes';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const useThemes = (): [ThemeData[] | null, { isLoading: boolean; isError: boolean }] => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiClient.get<GetThemesResponse>('/api/v1/themes');
        setFetchState({ isLoading: false, isError: false, data: response.data.themes });
      } catch (error) {
        console.error(error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchThemes();
  }, []);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError }];
};
