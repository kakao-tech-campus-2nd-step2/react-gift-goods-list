import type { RankingFilterOption } from '@/types';
import type { ProductData } from '@/types/api';

import apiClient from './apiClient';

/* Product data 가져오기 */
export const fetchRankingProducts = async (
  filterOption: RankingFilterOption,
): Promise<ProductData[]> => {
  const response = await apiClient.get<{ products: ProductData[] }>('/ranking/products', {
    params: filterOption,
  });
  return response.data.products;
};
