import { AxiosError } from 'axios';
import { useEffect,useState } from 'react';

import apiClient from '@/api';
import type { ProductData,ThemeProductsResponse } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
  errorMessage: string | null;
}

export const useThemeProducts = (themeKey: string) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: null,
	errorMessage: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<ThemeProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
          params: {
            maxResults: 20,
          },
        });
        setFetchState({ isLoading: false, isError: false, data: response.data.products, errorMessage: null});
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
        console.error(error);
        setFetchState({ isLoading: false, isError: true, data: null, errorMessage: errorMessage});
      }
    };
    fetchProducts();
  }, [themeKey]);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError, errorMessage: fetchState.errorMessage}] as const;
};
