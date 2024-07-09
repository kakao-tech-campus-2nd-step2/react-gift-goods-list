import type { ProductData } from '@/types/api';

import apiClient from './apiClient';

/* Theme 별 Product data 가져오기 */
export const fetchThemeProducts = async (themeKey: string): Promise<ProductData[]> => {
  const response = await apiClient.get<{products: ProductData[]}>(`/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    }
  });
  return response.data.products;
};