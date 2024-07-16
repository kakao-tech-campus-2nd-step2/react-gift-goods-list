import { AxiosError } from 'axios';
import { useEffect,useState } from 'react';

import apiClient from '@/api/index';
import type { ThemeData,ThemesResponse } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
  errorMessage: string | null;
}

export const useThemes = () => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData[]>>({
    isLoading: true,
    isError: false,
    data: null,
	errorMessage: null,
  });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiClient.get<ThemesResponse>('/api/v1/themes');
        setFetchState({ isLoading: false, isError: false, data: response.data.themes, errorMessage: null});
      } catch (err) {
		const error = err as AxiosError;
        console.error(error);
		const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
        setFetchState({ isLoading: false, isError: true, data: null, errorMessage: errorMessage});
      }
    };
    fetchThemes();
  }, []);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError, errorMessage: fetchState.errorMessage}] as const;
};
