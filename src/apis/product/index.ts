import type { ProductWithInfo } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

const MAX_RESULTS = 20;

export interface GetThemesParams {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
}
export const getProductWithTheme = async ({ themeKey, pageToken }: GetThemesParams) => {
  const params = {
    maxResults: MAX_RESULTS,
    ...(pageToken && { pageToken }),
  };

  const { data } = await instance.get<ProductWithInfo>(API.THEMES_DETAIL(themeKey), {
    params,
  });

  return data;
};
