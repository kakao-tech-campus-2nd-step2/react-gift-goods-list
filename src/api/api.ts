import axios from 'axios';

import type { ProductsResponse, RankingResponse, ThemesResponse } from '@/types';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-jihwan.vercel.app',
});

export const getThemes = async (): Promise<ThemesResponse> => {
  const response = await api.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const getThemeProducts = async (themeKey: string): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    },
  });
  return response.data;
};

export const getRankingProducts = async (
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN',
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE',
): Promise<RankingResponse> => {
  const response = await api.get<RankingResponse>('/api/v1/ranking/products', {
    params: { targetType, rankType },
  });
  return response.data;
};
