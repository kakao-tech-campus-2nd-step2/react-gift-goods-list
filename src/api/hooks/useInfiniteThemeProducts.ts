import type { AxiosError } from 'axios';
import type { QueryFunctionContext } from 'react-query';
import { useInfiniteQuery } from 'react-query';

import { getThemeProducts } from '@/api/api';
import type { ProductsResponse } from '@/types';

const fetchThemeProducts = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<ProductsResponse> => {
  const [, themeKey] = queryKey;
  const response = await getThemeProducts(themeKey, pageParam);
  return response;
};

export const useInfiniteThemeProducts = (themeKey: string) => {
  return useInfiniteQuery<ProductsResponse, AxiosError, ProductsResponse, [string, string]>(
    ['themeProducts', themeKey],
    fetchThemeProducts,
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
      retry: false,
    },
  );
};
