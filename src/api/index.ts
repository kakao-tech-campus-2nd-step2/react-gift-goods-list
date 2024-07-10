// src/api/index.ts
import axios from 'axios';

import type { GoodsData, RankingFilterOption, ThemeData } from '@/types';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-eunjin.vercel.app',
});

export const fetchTheme = async (): Promise<ThemeData[]> => {
  const response = await api.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return response.data.themes;
};

export const fetchThemes = async (themeKey: string): Promise<ThemeData> => {
  console.log('Fetching theme with key:', themeKey);
  const response = await api.get<ThemeData>(`/api/v1/themes/${themeKey}`);
  console.log('Fetched theme data:', response.data);
  return response.data;
};

export const getThemeProducts = async (themeKey: string): Promise<GoodsData[]> => {
  const response = await api.get<{ products: GoodsData[] }>(`/api/v1/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    },
  });
  return response.data.products;
};

export const getRankingGoods = async (filterOption: RankingFilterOption): Promise<GoodsData[]> => {
  const response = await api.get<{ products: GoodsData[] }>('/api/v1/ranking/products', {
    params: filterOption,
  });
  return response.data.products;
};

export default api;
