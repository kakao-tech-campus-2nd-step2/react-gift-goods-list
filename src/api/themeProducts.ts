import type { QueryFunctionContext } from 'react-query';

import type { ProductData } from '@/types/api';

import apiClient from './apiClient';

/* Theme 별 Product data 가져오기 */
export const fetchThemeProducts = async ({ pageParam = 0, queryKey }: QueryFunctionContext): Promise<ProductData[]> => {
  const themeKey = queryKey[1];
  const response = await apiClient.get<{ products: ProductData[] }>(
    `/themes/${themeKey}/products`,
    {
      params: {
        offset: pageParam,
        limit: 20,
      },
    },
  );
  return response.data.products;
};
