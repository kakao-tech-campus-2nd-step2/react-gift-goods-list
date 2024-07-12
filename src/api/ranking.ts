import type { RankingFilterOption, RankingProductsResponse } from '@/types/index';

import api from './api';

export const fetchRankingProducts = async (
  filterOption: RankingFilterOption,
): Promise<RankingProductsResponse> => {
  const response = await api.get<RankingProductsResponse>('/api/v1/ranking/products', {
    params: filterOption,
  });
  return response.data;
};
