import type { ProductWithInfo } from '@/types/product';

import instance from '../instance';
import API from '../path';

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
  console.log(maxResults);
  console.log(themeKey);
  const params = {
    pageToken,
    maxResults,
  };

  if (pageToken) params.pageToken = pageToken;

  console.log(params);

  const res = await instance.get(API.THEMES_DETAIL(themeKey), {
    params,
  });
  console.log(res);
  return res.data!.products;
};
