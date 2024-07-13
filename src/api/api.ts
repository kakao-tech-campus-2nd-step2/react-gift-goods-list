import axios from 'axios';

import { RankingProductsResponse, ThemeProductsResponse, ThemesResponse } from '@/types';

const API_URL = 'https://react-gift-mock-api-eunkyung.vercel.app';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchThemes = async (): Promise<ThemesResponse> => {
  const response = await apiClient.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const fetchRankingProducts = async (
  targetType: string,
  rankType: string,
): Promise<RankingProductsResponse> => {
  const response = await apiClient.get<RankingProductsResponse>('/api/v1/ranking/products', {
    params: {
      targetType,
      rankType,
    },
  });
  return response.data;
};

export const fetchThemeProducts = async (
  themeKey: string,
  page: number = 0,
): Promise<ThemeProductsResponse> => {
  const response = await apiClient.get<ThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params: {
        maxResults: 20,
        page,
      },
    },
  );
  const nextCursor = response.data.products.length < 20 ? null : page + 1;
  return { ...response.data, nextCursor };
};
