import axios from 'axios';

import type { GoodsData, ProductsResponse,RankingFilterOption, RankingResponse, ThemesResponse } from '@/types';

export const api = axios.create({
  baseURL: 'https://react-gift-mock-api-ychy61.vercel.app',
});

const getRequest = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
};

export const fetchRankingProducts = (filterOption: RankingFilterOption): Promise<RankingResponse> => {
  return getRequest<RankingResponse>('/api/v1/ranking/products', {
    targetType: filterOption.targetType,
    rankType: filterOption.rankType,
  });
};

export const fetchThemeProducts = async (themeKey: string, pageSize = 20): Promise<GoodsData[]> => {
  return getRequest<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, { pageSize }).then((data) => data.products);
};

export const fetchThemes = async (): Promise<ThemesResponse['themes']> => {
  return getRequest<ThemesResponse>('/api/v1/themes').then((data) => data.themes);
};
