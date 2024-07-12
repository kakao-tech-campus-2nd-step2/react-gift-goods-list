import { useEffect,useState } from 'react';

import apiClient from '@/api';
import type { GetThemeProductsResponse, ProductData } from '@/api/types/apiTypes';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const useThemeProducts = (themeKey: string): [ProductData[] | null, { isLoading: boolean; isError: boolean }] => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<GetThemeProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
          params: {
            maxResults: 20,
          },
        });
        setFetchState({ isLoading: false, isError: false, data: response.data.products });
      } catch (error) {
        console.error(error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchProducts();
  }, [themeKey]);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError }];
};
