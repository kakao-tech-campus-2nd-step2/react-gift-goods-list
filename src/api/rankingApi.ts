import axios from 'axios';

import type { RankingFilterOption } from '../types';
import type { GetRankingProductsResponse, ProductData } from '../types/api';

const API_BASE_URL = 'https://react-gift-mock-api-alpha.vercel.app/api/v1';

export const getRankingProducts = async (filterOption: RankingFilterOption): Promise<{ products: ProductData[] }> => {
  const { targetType, rankType } = filterOption;
  const response = await axios.get<GetRankingProductsResponse>(`${API_BASE_URL}/ranking/products`, {
    params: { targetType, rankType }
  });
  return response.data;
};
