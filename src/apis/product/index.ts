import type { ProductWithInfo } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

export interface GetThemesParams {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}
export const getProductWithTheme = async ({
  themeKey,
  pageToken,
  maxResults,
}: GetThemesParams): Promise<ProductWithInfo> => {
  const params = {
    pageToken,
    maxResults,
  };

  if (pageToken) params.pageToken = pageToken;

  const { data } = await instance.get(API.THEMES_DETAIL(themeKey), {
    params,
  });

  return data.products;
};
