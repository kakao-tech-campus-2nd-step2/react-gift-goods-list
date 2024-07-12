import type { ProductWithInfo } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

interface ThemeProductsResponse {
  products: ProductWithInfo;
}

export interface GetThemesParams {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}
export const getProductWithTheme = async ({ themeKey, pageToken, maxResults }: GetThemesParams) => {
  const params = {
    pageToken,
    maxResults,
    ...(pageToken && { pageToken }),
  };

  const { data } = await instance.get<ThemeProductsResponse>(API.THEMES_DETAIL(themeKey), {
    params,
  });

  return data.products;
};
