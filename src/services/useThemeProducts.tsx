import { useInfiniteQuery } from '@tanstack/react-query';

import { instantAxios } from '.';
import type { Product } from './types';

export type ProductResponseData = {
  products: Product[];
  nextPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
};

export const useThemeProducts = (themeKey: string) =>
  useInfiniteQuery<ProductResponseData>({
    queryKey: ['themeProducts', themeKey],
    queryFn: async ({ pageParam = null }) => {
      const response = await instantAxios.get<ProductResponseData>(`v1/themes/${themeKey}/products`, {
        params: {
          pageToken: pageParam,
          maxResults: 20,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: 0,
  });
