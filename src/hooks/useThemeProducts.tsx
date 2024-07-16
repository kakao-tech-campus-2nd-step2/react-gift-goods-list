import { AxiosError } from 'axios';
import { useInfiniteQuery } from 'react-query';

import apiClient from '@/api';
import type { ThemeProductsResponse } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

const fetchProducts = async ({ themeKey, pageParam = 0 }: { themeKey: string; pageParam?: number }) => {
  try {
    const response = await apiClient.get<ThemeProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
      params: {
        pageToken: pageParam,
        maxResults: 20,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
    console.error('Error fetching products:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const useThemeProducts = (themeKey: string) => {
  return useInfiniteQuery(
    ['themeProducts', themeKey],
    ({ pageParam = 0 }) => {
      return fetchProducts({ themeKey, pageParam });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || !lastPage.products || lastPage.products.length < 20) {
          return undefined;
        }
        return pages.length;
      },
    }
  );
};
