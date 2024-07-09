import type { GoodsData } from '@/types';

import instance from './api';

interface FetchThemeProductsResponse {
  products: GoodsData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export const fetchThemeProducts = async (
  themeKey: string,
  pageToken?: string,
  maxResults: number = 20,
): Promise<FetchThemeProductsResponse> => {
  const params: { pageToken?: string; maxResults: number } = { maxResults };
  if (pageToken) {
    params.pageToken = pageToken;
  }

  const res = await instance.get<FetchThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params,
    },
  );

  return res.data;
};
